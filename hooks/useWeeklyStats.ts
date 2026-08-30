import { DailyFocusTotal, getWeeklyBreakCount, getWeeklyFocusTotals } from "@/db/sessions";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export function useWeeklyStats() {
    const [dailyTotals, setDailyTotals] = useState<DailyFocusTotal[]>([]);
    const [breakCount, setBreakCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            setDailyTotals(getWeeklyFocusTotals());
            setBreakCount(getWeeklyBreakCount());
            setIsLoading(false);
        }, [])
    );

    const averageSeconds = dailyTotals.length > 0
        ? Math.round(
            dailyTotals.reduce((sum, d) => sum + d.totalSeconds, 0) / dailyTotals.length
        ) : 0;

    const bestDay = dailyTotals.length > 0
        ? dailyTotals.reduce((best, d) => d.totalSeconds > best.totalSeconds ? d : best)
        : null;

    return { dailyTotals, breakCount, averageSeconds, bestDay, isLoading };
}
