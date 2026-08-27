import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#171717",
                tabBarInactiveTintColor: "#a3a3a3",
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Dashboard",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="tips"
                options={{
                    title: "Tips",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="bulb-outline" size={size} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="stats"
                options={{
                    title: "Stats",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="bar-chart-outline" size={size} color={color} />
                    )
                }}
            />
        </Tabs>
    )
}
