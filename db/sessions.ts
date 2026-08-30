import { Session, SessionType } from "@/types/session";
import db from "./client";
import { MIN_SESSION_DURATION_SECONDS } from "@/constants/config";

export interface DailyFocusTotal {
    dayStart: number; // Timestamp epoch du début de journée
    totalSeconds: number;
}

// Démarre une nouvelle session et retourne son id
export function startSession(type: SessionType): number {
    const startedAt = Date.now();
    const result = db.runSync(
        `INSERT INTO sessions (type, started_at) VALUES (?, ?);`,
        [type, startedAt],
    );
    return result.lastInsertRowId;
}

// Clôture une session en cours. Si la durée est trop courte, elle est supprimée.
export function endSession(sessionId: number): void {
    const session = db.getFirstSync<Session>(
        `SELECT * FROM sessions WHERE id = ?;`,
        [sessionId]
    );

    if (!session) return;

    const endedAt = Date.now();
    const durationSeconds = Math.floor((endedAt - session.started_at) / 1000);

    if (durationSeconds < MIN_SESSION_DURATION_SECONDS) {
        // Session trop courte, probablement accidentelle -> on la supprime
        db.runSync(`DELETE FROM sessions WHERE id = ?;`, [sessionId]);
        return;
    }

    db.runSync(
        `UPDATE sessions SET ended_at = ?, duration_seconds = ? WHERE id = ?;`,
        [endedAt, durationSeconds, sessionId],
    );
}

// Récupère une session encore ouverte (ended_at IS NULL), s'il y en a une.
// Utilisé au démarrage de l'app pour détecter une sessions orpheline.
export function getOrphanSession(): Session | null {
    return db.getFirstSync<Session>(
        `SELECT * FROM sessions WHERE ended_at IS NULL LIMIT 1;`
    );
}

// Annule une session orpheline (app fermée en plein milieu)
export function discardSession(sessionId: number): void {
    db.runSync(`DELETE FROM sessions WHERE id = ?;`, [sessionId]);
}

// Récupère toutes les sessions complètes d'une journée donnée
export function getSessionsForDay(dayStart: number, dayEnd: number): Session[] {
    return db.getAllSync<Session>(
        `SELECT * FROM sessions
                WHERE started_at >= ? AND started_at < ? AND ended_at IS NOT NULL
                ORDER BY started_at ASC;`,
        [dayStart, dayEnd],
    );
}

// Retourne le total de temps focus, jour par jour, sur les 7 derniers jours (incluant aujourd'hui)
export function getWeeklyFocusTotals(): DailyFocusTotal[] {
    const now = new Date();
    const todayStart = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
    ).getTime();

    const results: DailyFocusTotal[] = [];

    for (let i = 6; i >= 0; i--) {
        const dayStart = todayStart - i * 24 * 60 * 60 * 1000;
        const dayEnd = dayStart + 24 * 60 * 60 * 1000;

        const row = db.getFirstSync<{ total: number | null }>(
            `SELECT SUM(duration_seconds) as total FROM sessions
                    WHERE type = 'focus' AND started_at >= ? AND started_at < ? AND ended_at IS NOT NULL;`,
            [dayStart, dayEnd],
        );

        results.push({ dayStart, totalSeconds: row?.total ?? 0 });
    }

    return results;
}

// Retoune le total de sessions "break" sur les 7 derniers jours
export function getWeeklyBreakCount(): number {
    const now = new Date();
    const sevenDaysAgo = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 6,
    ).getTime();

    const row = db.getFirstSync<{ count: number }>(
        `SELECT COUNT(*) as count FROM sessions
                WHERE type = 'break' AND started_at >= ? AND ended_at IS NOT NULL;`,
        [sevenDaysAgo],
    );

    return row?.count ?? 0;
}
