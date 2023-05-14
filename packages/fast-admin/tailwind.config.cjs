/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                main: "'Poppins', serif",
            },
            colors: {
                primary: {
                    100: "#9DC107",
                    200: "#499922",
                    300: "#286333",
                },
                grey: {
                    100: "#d2d2d2",
                    200: "#404043",
                },
                dark: { 100: "#231f20", 200: "#131212" },
                light: "efefef",
            },
        },
        boxShadow: {
            solid: "0 0 0 2px #404043",
        },
    },
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: "#fb923c",

                    secondary: "#14532d",

                    accent: "#a9f9b8",

                    neutral: "#212B3B",

                    "base-100": "#E1E5EA",

                    info: "#78C2D9",

                    success: "#2DE674",

                    warning: "#fde047",
                    error: "#dc2626",
                },
            },
        ],
    },
    plugins: [require("daisyui")],
};
