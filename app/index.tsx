import { View, Text } from "react-native";

export default function Index() {
    return (
        <View className="flex-1 items-center justify-center bg-neutral-50 px-4">
            <View className="border border-neutral-300 rounded-2xl p-6 w-full max-w-sm">
                <Text className="text-lg font-medium text-neutral-900">
                    Test bento card
                </Text>
                <Text className="text-sm text-neutral-500 mt-1">
                    Si t'as une bordure fine et des coins arrondis, NativeWind fonctionne
                </Text>
            </View>
        </View>
    );
}
