import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useWeeklyStats } from "../../hooks/useWeeklyStats";
import { useThemeColors } from "../../hooks/useThemeColors";

function formatDuration(totalSeconds: number) {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    if (h === 0) return `${m}min`;
    return `${h}h ${m.toString().padStart(2, "0")}min`;
}

const DAY_LABELS = ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"];

export default function Stats() {
    const theme = useThemeColors();
    const { dailyTotals, breakCount, averageSeconds, bestDay, isLoading } =
        useWeeklyStats();

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center bg-background dark:bg-background-dark">
                <Text className="text-text-muted dark:text-text-muted-dark">
                    Chargement...
                </Text>
            </View>
        );
    }

    const maxSeconds = Math.max(...dailyTotals.map((d) => d.totalSeconds), 1);

    return (
        <ScrollView
            className="flex-1 bg-background dark:bg-background-dark px-4 pt-16"
            contentContainerStyle={{ paddingBottom: 100 }}
        >
            <Text className="text-2xl font-semibold text-text-primary dark:text-text-primary-dark mb-1">
                Stats
            </Text>
            <Text className="text-sm text-text-secondary dark:text-text-secondary-dark mb-6">
                Tes 7 derniers jours
            </Text>

            <View className="flex-row gap-3 mb-3">
                <View className="flex-1 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-4">
                    <Text className="text-xs text-text-secondary dark:text-text-secondary-dark mb-1">
                        Moyenne focus/jour
                    </Text>
                    <Text className="text-xl font-semibold text-text-primary dark:text-text-primary-dark">
                        {formatDuration(averageSeconds)}
                    </Text>
                </View>
                <View className="flex-1 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-4">
                    <Text className="text-xs text-text-secondary dark:text-text-secondary-dark mb-1">
                        Total pauses
                    </Text>
                    <Text className="text-xl font-semibold text-text-primary dark:text-text-primary-dark">
                        {breakCount}
                    </Text>
                </View>
            </View>

            <View className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-4 mb-3">
                <Text className="text-sm font-medium text-text-primary dark:text-text-primary-dark mb-4">
                    Focus par jour
                </Text>

                <View style={{ height: 100, flexDirection: "row", alignItems: "flex-end", gap: 8 }}>
                    {dailyTotals.map((day, index) => {
                        const barHeight = Math.max((day.totalSeconds / maxSeconds) * 100, 4);
                        const isToday = index === dailyTotals.length - 1;
                        return (
                            <View key={day.dayStart} style={{ flex: 1 }}>
                                <View
                                    style={{
                                        height: barHeight,
                                        width: "100%",
                                        borderRadius: 4,
                                        backgroundColor: isToday ? theme.accent : theme.borderStrong,
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
                                className="text-xs text-text-muted dark:text-text-muted-dark text-center"
                                style={{ flex: 1 }}
                            >
                                {DAY_LABELS[date.getDay()]}
                            </Text>
                        );
                    })}
                </View>
            </View>

            {bestDay && bestDay.totalSeconds > 0 && (
                <View className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-4 flex-row items-center justify-between">
                    <View>
                        <Text className="text-sm font-medium text-text-primary dark:text-text-primary-dark mb-1">
                            Meilleure journée
                        </Text>
                        <Text className="text-xs text-text-secondary dark:text-text-secondary-dark">
                            {DAY_LABELS[new Date(bestDay.dayStart).getDay()]},{" "}
                            {formatDuration(bestDay.totalSeconds)} de focus
                        </Text>
                    </View>
                    <Ionicons name="trophy-outline" size={24} color={theme.warning} />
                </View>
            )}
        </ScrollView>
    );
}
