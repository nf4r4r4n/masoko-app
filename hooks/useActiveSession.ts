import { discardSession, endSession, getOrphanSession, startSession } from "@/db/sessions";
import { SessionType } from "@/types/session";
import { useCallback, useEffect, useState } from "react";


interface ActiveSession {
    id: number;
    type: SessionType;
    startedAt: number;
}

export function useActiveSession() {
    const [active, setActive] = useState<ActiveSession | null>(null);
    const [isReady, setIsReady] = useState(false);

    // Au montage: detecte et nettoie une session orpheline (app fermee en plein milieu)
    useEffect(() => {
        const orphan = getOrphanSession();
        if (orphan) {
            discardSession(orphan.id);
        }
        setIsReady(true);
    }, []);

    const start = useCallback((type: SessionType) => {
        // Si une session d'un autre type est deja active, on la cloture proprement d'abord
        setActive((current) => {
            if (current) {
                endSession(current.id);
            }
            const id = startSession(type);
            return { id, type, startedAt: Date.now() };
        });
    }, []);

    const stop = useCallback(() => {
        setActive((current) => {
            if (current) {
                endSession(current.id);
            }
            return null;
        });
    }, []);

    return { active, isReady, start, stop }
}