import { useWeeklyStats } from "@/hooks/useWeeklyStats";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";

function formatDuration(totalSeconds: number) {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    if (h === 0) return `${m}min`;
    return `${h}h ${m.toString().padStart(2, "0")}min`;
}

const DAY_LABELS = ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"];

export default function Stats() {
    const { dailyTotals, breakCount, averageSeconds, bestDay, isLoading } = useWeeklyStats();

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center bg-neutral-50">
                <Text className="text-neutral-400">Chargement...</Text>
            </View>
        );
    }

    const maxSeconds = Math.max(...dailyTotals.map((d) => d.totalSeconds), 1);

    return (
        <ScrollView
            className="flex-1 bg-neutral-50 px-4 pt-16"
            contentContainerStyle={{ paddingBottom: 100 }}
        >
            <Text className="text-2xl font-semibold text-neutral-900 mb-1">
                Stats
            </Text>
            <Text className="text-sm text-neutral-500 mb-6">
                Tes 7 derniers jours
            </Text>

            <View className="flex-row gap-3 mb-3">
                <View className="flex-1 border border-neutral-300 rounded-2xl p-4">
                    <Text className="text-xs text-neutral-500 mb-1">
                        Moyenne focus/jour
                    </Text>
                    <Text className="tex-xl font-semibold decoration-neutral-900">
                        {formatDuration(averageSeconds)}
                    </Text>
                </View>
                <View className="flex-1 border border-neutral-300 rounded-2xl p-4">
                    <Text className="text-xs text-neutral-500 mb-1">
                        Total pauses
                    </Text>
                    <Text className="text-xl font-semibold text-neutral-900">
                        {breakCount}
                    </Text>
                </View>
            </View>

            <View className="border border-neutral-300 rounded-2xl p-4 mb-3">
                <Text className="text-sm font-medium text-neutral-900 mb-10">
                    Focus par jour
                </Text>
                <View style={{ height: 100, flexDirection: "row", alignItems: "flex-end", gap: 8 }}>
                    {dailyTotals.map((day, index) => {
                        const barHeight = Math.max(
                            (day.totalSeconds / maxSeconds) * 100,
                            4
                        );
                        const isToday = index === dailyTotals.length - 1;
                        return (
                            <View key={day.dayStart} style={{ flex: 1 }}>
                                <View
                                    style={{
                                        height: barHeight,
                                        width: "100%",
                                        borderRadius: 4,
                                        backgroundColor: isToday ? "#171717" : "#d4d4d4",
                                    }}
                                />
                            </View>
                        );
                    })}
                </View>
                <View className="flex-row mt-2" style={{ gap: 8 }}>
                    {dailyTotals.map((day) => {
                        const date = new Date(day.dayStart);
                        return (
                            <Text
                                key={day.dayStart}
                                className="text-xs text-neutral-400 text-center"
                                style={{ flex: 1 }}
                            >
                                {DAY_LABELS[date.getDay()]}
                            </Text>
                        );
                    })}
                </View>
            </View>

            {bestDay && bestDay.totalSeconds > 0 && (
                <View className="border border-neutral-300 rounded-2xl p-4 flex-row items-center justify-between">
                    <View>
                        <Text className="text-sm font-medium text-neutral-900 mb-1">
                            Meilleure journée
                        </Text>
                        <Text className="text-xs text-neutral-500">
                            {DAY_LABELS[new Date(bestDay.dayStart).getDay()]}
                            , {formatDuration(bestDay.totalSeconds)} de focus
                        </Text>
                    </View>
                    <Ionicons name="trophy-outline" size={24} color="#eab308" />
                </View>
            )}
        </ScrollView>
    );
}
