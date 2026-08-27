import { useEffect, useState } from "react";
import "../global.css";
import { initDatabase } from "@/db/client";
import { Text, View } from "react-native";
import { Stack } from "expo-router";

export default function RootLayout() {
    const [isDbReady, setIsDbReady] = useState(false);

    useEffect(() => {
        initDatabase();
        setIsDbReady(true);
    }, []);

    if (!isDbReady) {
        return (
            <View className="flex-1 items-center justify-center bg-neutral-50">
                <Text className="text-neutral-400">Chargement...</Text>
            </View>
        );
    }

    return <Stack />;
}
