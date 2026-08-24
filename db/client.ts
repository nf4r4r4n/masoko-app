import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("masoko.db");

export function initDatabase() {
    db.execSync(`
        CREATE TABLE IF NOT EXISTS sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL CHECK(type IN ('focus', 'break')),
            started_at INTEGER NOT NULL,
            ended_at INTEGER,
            duration_seconds INTEGER
        );
    `);
}

export default db;
