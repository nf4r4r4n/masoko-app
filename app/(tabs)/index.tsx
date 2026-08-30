import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useActiveSession } from "../../hooks/useActiveSession";
import { useDailyStats } from "../../hooks/useDailyStats";
import { ThemeToggle } from "../../components/ui/ThemeToggle";

function formatDuration(totalSeconds: number) {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
        .toString()
        .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export default function Dashboard() {
    const { active, isReady, start, stop } = useActiveSession();
    const [refreshKey, setRefreshKey] = useState(0);
    const { focusSeconds, focusSessionCount } = useDailyStats(refreshKey);
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        if (!active) {
            setElapsed(0);
            return;
        }
        const interval = setInterval(() => {
            setElapsed(Math.floor((Date.now() - active.startedAt) / 1000));
        }, 1000);
        return () => clearInterval(interval);
    }, [active]);

    const handleStop = () => {
        stop();
        setRefreshKey((k) => k + 1);
    };

    if (!isReady) {
        return (
            <View className="flex-1 items-center justify-center bg-background dark:bg-background-dark">
                <Text className="text-text-muted dark:text-text-muted-dark">
                    Chargement...
                </Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-background dark:bg-background-dark px-4 pt-16">
            <View className="flex-row items-start justify-between mb-6">
                <View className="flex-1">
                    <Text className="text-sm text-text-muted dark:text-text-muted-dark mb-1">
                        {new Date().toLocaleDateString("fr-FR", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                        })}
                    </Text>
                    <Text className="text-2xl font-semibold text-text-primary dark:text-text-primary-dark">
                        Bonjour
                    </Text>
                </View>
                <ThemeToggle />
            </View>

            <View className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-6 items-center mb-3">
                <Text className="text-sm text-text-secondary dark:text-text-secondary-dark mb-4">
                    {active
                        ? `Session ${active.type === "focus" ? "focus" : "pause"} en cours`
                        : "Choisis un type de session"}
                </Text>
                <Text className="text-3xl font-mono text-text-primary dark:text-text-primary-dark mb-4">
                    {formatDuration(elapsed)}
                </Text>

                {active ? (
                    <Pressable
                        onPress={handleStop}
                        className="bg-accent dark:bg-accent-dark rounded-full px-8 py-3"
                    >
                        <Text className="text-white dark:text-background-dark font-medium">
                            Arrêter
                        </Text>
                    </Pressable>
                ) : (
                    <View className="flex-row gap-3">
                        <Pressable
                            onPress={() => start("focus")}
                            className="bg-accent dark:bg-accent-dark rounded-full px-6 py-3"
                        >
                            <Text className="text-white dark:text-background-dark font-medium">
                                Focus
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => start("break")}
                            className="border border-border-strong dark:border-border-strong-dark rounded-full px-6 py-3"
                        >
                            <Text className="text-text-primary dark:text-text-primary-dark font-medium">
                                Pause
                            </Text>
                        </Pressable>
                    </View>
                )}
            </View>

            <View className="flex-row gap-3">
                <View className="flex-1 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-4">
                    <Text className="text-xs text-text-secondary dark:text-text-secondary-dark mb-1">
                        Focus aujourd'hui
                    </Text>
                    <Text className="text-xl font-semibold text-text-primary dark:text-text-primary-dark">
                        {formatDuration(focusSeconds)}
                    </Text>
                </View>
                <View className="flex-1 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-4">
                    <Text className="text-xs text-text-secondary dark:text-text-secondary-dark mb-1">
                        Sessions
                    </Text>
                    <Text className="text-xl font-semibold text-text-primary dark:text-text-primary-dark">
                        {focusSessionCount}
                    </Text>
                </View>
            </View>
        </View>
    );
}
