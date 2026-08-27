export type TipSize = "large" | "small";

export interface Tip {
    id: string;
    title: string;
    description: string;
    icon: string; // nom d'icône Ionicons
    size: TipSize;
}

export const TIPS: Tip[] = [
    {
        id: "20-20-20",
        title: "La règle 20-20-20",
        description: "Toutes les 20 minutes, regarde à 20 pieds (6m) pendant 20 secondes.",
        icon: "time-outline",
        size: "large",
    },
    {
        id: "luminosite",
        title: "Luminosité",
        description: "Adapte la luminosité de ton écran à la pièce.",
        icon: "sunny-outline",
        size: "small",
    },
    {
        id: "posture",
        title: "Posture",
        description: "Garde l'écran à hauteur des yeux.",
        icon: "body-outline",
        size: "small",
    },
    {
        id: "clignements",
        title: "Clignements",
        description: "On cligne moins des yeux devant un écran. Pense à le faire consciemment.",
        icon: "water-outline",
        size: "small",
    },
    {
        id: "lumiere-bleue",
        title: "Lumière bleue",
        description: "Réduis les écrans 1h avant de dormir.",
        icon: "moon-outline",
        size: "small",
    },
    {
        id: "distance",
        title: "Distance à l'écran",
        description: "Garde une distance d'au moins 50cm entre tes yeux et l'écran.",
        icon: "resize-outline",
        size: "small",
    },
    {
        id: "hydratation",
        title: "Hydratation",
        description: "Bois suffisamment d'eau, ça aide aussi tes yeux.",
        icon: "water",
        size: "small",
    },
    {
        id: "air-sec",
        title: "Air sec",
        description: "La climatisation et le chauffage assèchent l'air et irritent les yeux.",
        icon: "cloud-outline",
        size: "small",
    },
    {
        id: "exercices",
        title: "Exercices oculaires",
        description: "Fais rouler tes yeux lentement dans tous les sens quelques secondes par jour.",
        icon: "eye-outline",
        size: "small",
    },
];
