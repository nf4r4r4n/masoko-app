import { colors } from "@/constants/colors";
import { useColorScheme } from "react-native";

export function useThemeColors() {
    const scheme = useColorScheme();
    return colors[scheme === "dark" ? "dark" : "light"];
}
