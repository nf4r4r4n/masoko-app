import { getSessionsForDay } from "@/db/sessions";
import { useCallback, useEffect, useState } from "react";


function getTodayBounds() {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const end = start + 24 * 60 * 60 * 1000;
    return { start, end };
}

export function useDailyStats(refreshKey: number) {
    const [focusSeconds, setFocusSeconds] = useState(0);
    const [focusSessionCount, setFocusSessionCount] = useState(0);

    const refresh = useCallback(() => {
        const { start, end } = getTodayBounds();
        const sessions = getSessionsForDay(start, end);

        const focusSessions = sessions.filter((s) => s.type === "focus");
        const totalFocus = focusSessions.reduce(
            (sum, s) => sum + (s.duration_seconds ?? 0),
            0
        );

        setFocusSeconds(totalFocus);
        setFocusSessionCount(focusSessions.length);
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh, refreshKey]);

    return { focusSeconds, focusSessionCount, refresh };
}