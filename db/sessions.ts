import { Session, SessionType } from "@/types/session";
import db from "./client";
import { MIN_SESSION_DURATION_SECONDS } from "@/constants/config";


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
