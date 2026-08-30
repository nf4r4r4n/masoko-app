/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                background: "#F2EFE7",
                "background-dark": "#0F1B26",
                surface: "#FFFFFF",
                "surface-dark": "#16232F",
                border: "#C8DFDB",
                "border-dark": "#2A3D4A",
                "border-strong": "#A9C7C2",
                "border-strong-dark": "#3D5566",
                "text-primary": "#14283A",
                "text-primary-dark": "#EDF2F2",
                "text-secondary": "#4B6572",
                "text-secondary-dark": "#A9C0C7",
                "text-muted": "#8AA3AA",
                "text-muted-dark": "#6E848C",
                accent: "#3368A0",
                "accent-dark": "#66A3BF",
                "accent-soft": "#C8DFDB",
                "accent-soft-dark": "#1E3540",
                warning: "#C9A227",
                "warning-dark": "#DDBB4A",
            },
        },
    },
    plugins: [],
}

