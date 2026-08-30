import { View, Text, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TIPS } from "../../constants/tips";
import { useThemeColors } from "../../hooks/useThemeColors";

export default function TipsCare() {
    const theme = useThemeColors();
    const largeTips = TIPS.filter((t) => t.size === "large");
    const smallTips = TIPS.filter((t) => t.size === "small");

    return (
        <ScrollView
            className="flex-1 bg-background dark:bg-background-dark px-4 pt-16"
            contentContainerStyle={{ paddingBottom: 100 }}
        >
            <Text className="text-2xl font-semibold text-text-primary dark:text-text-primary-dark mb-1">
                Tips & Care
            </Text>
            <Text className="text-sm text-text-secondary dark:text-text-secondary-dark mb-6">
                Des habitudes simples pour tes yeux
            </Text>

            {largeTips.map((tip) => (
                <View
                    key={tip.id}
                    className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-4 mb-3 flex-row items-start gap-3"
                >
                    <View className="w-10 h-10 rounded-xl bg-accent-soft dark:bg-accent-soft-dark items-center justify-center">
                        <Ionicons name={tip.icon as any} size={20} color={theme.accent} />
                    </View>
                    <View className="flex-1">
                        <Text className="font-medium text-text-primary dark:text-text-primary-dark mb-1">
                            {tip.title}
                        </Text>
                        <Text className="text-sm text-text-secondary dark:text-text-secondary-dark">
                            {tip.description}
                        </Text>
                    </View>
                </View>
            ))}

            <View className="flex-row flex-wrap justify-between">
                {smallTips.map((tip) => (
                    <View
                        key={tip.id}
                        className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl p-4 mb-3"
                        style={{ width: "48%" }}
                    >
                        <Ionicons name={tip.icon as any} size={20} color={theme.accent} />
                        <Text className="font-medium text-sm text-text-primary dark:text-text-primary-dark mt-2 mb-1">
                            {tip.title}
                        </Text>
                        <Text className="text-xs text-text-secondary dark:text-text-secondary-dark">
                            {tip.description}
                        </Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}
