import { useActiveSession } from "@/hooks/useActiveSession";
import { useDailyStats } from "@/hooks/useDailyStats";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";


function formatDuration(totalSeconds: number) {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export default function Dashboard() {
    const { active, isReady, start, stop } = useActiveSession();
    const [refreshKey, setRefreshKey] = useState(0);
    const { focusSeconds, focusSessionCount } = useDailyStats(refreshKey);
    const [elapsed, setElapsed] = useState(0);

    // Timer live pendant une session active
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
            <View className="flex-1 items-center justify-center bg-neutral-50">
                <Text className="text-neutral-400">Chargement...</Text>
            </View>
        )
    }

    return (
        <View className="flex-1 bg-neutral-50 px-4 pt-16">
            <Text className="text-center text-sm text-neutral-400 mb-1">
                {new Date().toLocaleDateString("fr-FR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                })}
            </Text>
            <Text className="text-center text-2xl font-semibold text-neutral-900 mb-6">
                Bonjour
            </Text>

            <View className="border border-neutral-300 rounded-2xl p-6 items-center mb-3">
                <Text className="text-sm text-neutral-500 mb-4">
                    {active
                        ? `Session ${active.type === "focus" ? "focus" : "pause"} en cours`
                        : "Choisis un type de session"}
                </Text>
                <Text className="text-3xl font-mono text-neutral-900 mb-4">
                    {formatDuration(elapsed)}
                </Text>

                {active ? (
                    <Pressable
                        onPress={handleStop}
                        className="bg-neutral-900 rounded-full px-8 py-3"
                    >
                        <Text className="text-white font-medium">Arrêter</Text>
                    </Pressable>
                ) : (
                    <View className="flex-row gap-3">
                        <Pressable
                            onPress={() => start("focus")}
                            className="bg-neutral-900 rounded-full px-6 py-3"
                        >
                            <Text className="text-white font-medium">Focus</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => start("break")}
                            className="border border-neutral-300 rounded-full px-6 py-3"
                        >
                            <Text className="text-neutral-900 font-medium">Pause</Text>
                        </Pressable>
                    </View>
                )}
            </View>

            <View className="flex-row gap-3">
                <View className="flex-1 border border-neutral-300 rounded-2xl p-4">
                    <Text className="text-xs text-neutral-500 mb-1">Focus aujourd'hui</Text>
                    <Text className="text-xl font-semibold text-neutral-900">
                        {formatDuration(focusSeconds)}
                    </Text>
                </View>
                <View className="flex-1 border border-neutral-300 rounded-2xl p-4">
                    <Text className="text-xs text-neutral-500 mb-1">Sessions</Text>
                    <Text className="text-xl font-semibold text-neutral-900">
                        {focusSessionCount}
                    </Text>
                </View>
            </View>
        </View>
    );
}