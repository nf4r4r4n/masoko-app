export type SessionType = "focus" | "break";

export interface Session {
    id: number;
    type: SessionType;
    started_at: number;
    ended_at: number | null;
    duration_seconds: number | null;
}
