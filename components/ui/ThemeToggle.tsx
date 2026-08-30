import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Appearance, Pressable, useColorScheme } from "react-native";

type Preference = "system" | "light" | "dark";

export function ThemeToggle() {
    const systemScheme = useColorScheme();
    const [preference, setPreference] = useState<Preference>("system");

    const cycle = () => {
        const next: Preference = preference === "system" ? "light" : preference === "light" ? "dark" : "system";
        setPreference(next);
        Appearance.setColorScheme(next === "system" ? null : next);
    };

    const activeScheme = preference === "system" ? systemScheme : preference;
    const iconName = preference === "system"
        ? "phone-portrait-outline"
        : activeScheme === "dark"
            ? "moon"
            : "sunny";

    return (
        <Pressable
            onPress={cycle}
            className="w-10 h-10 rounded-full border-border dark:border-border-dark items-center justify-center"
        >
            <Ionicons
                name={iconName as any}
                size={18}
                color={activeScheme === "dark" ? "#EDF2F2" : "#14283A"}
            />
        </Pressable>
    );
}
