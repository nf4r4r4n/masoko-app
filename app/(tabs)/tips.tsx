import { TIPS } from "@/constants/tips";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";

export default function TipsCare() {
    const largeTips = TIPS.filter((t) => t.size === "large");
    const smallTips = TIPS.filter((t) => t.size === "small");

    return (
        <ScrollView
            className="flex-1 bg-neutral-50 px-4 pt-16"
            contentContainerStyle={{ paddingBottom: 100 }}
        >
            <Text className="text-2xl font-semibold text-neutral-900 mb-1">
                Tips & Care
            </Text>
            <Text className="text-sm text-neutral-500 mb-6">
                Des habitudes simples pour tes yeux
            </Text>

            {largeTips.map((tip) => (
                <View
                    key={tip.id}
                    className="border border-neutral-300 rounded-2xl p-4 mb-3 flex-row items-start gap-3"
                >
                    <View className="w-10 h-10 rounded-xl bg-neutral-100 items-center justify-center">
                        <Ionicons name={tip.icon as any} size={20} color="#171717" />
                    </View>
                    <View className="flex-1">
                        <Text className="font-medium text-neutral-900 mb-1">
                            {tip.title}
                        </Text>
                        <Text className="text-sm text-neutral-500">
                            {tip.description}
                        </Text>
                    </View>
                </View>
            ))}

            <View className="flex-row flex-wrap justify-between">
                {smallTips.map((tip) => (
                    <View
                        key={tip.id}
                        className="border border-neutral-300 rounded-2xl p-4 mb-3"
                        style={{ width: "48%" }}
                    >
                        <Ionicons name={tip.icon as any} size={20} color="#171717" />
                        <Text className="font-medium text-sm text-neutral-900 mt-2 mb-1">
                            {tip.title}
                        </Text>
                        <Text className="text-xs text-neutral-500">
                            {tip.description}
                        </Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}
