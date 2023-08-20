import React, { createContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";

// Оголошення контексту
interface ThemeContextProps {
    changeTheme: () => void;
    sunTheme: boolean;
}

export const ThemeContext = createContext({} as ThemeContextProps);

export const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [sunTheme, setSunTheme] = useState(false);
    const darkStyle = {
        colors: {
            background: "#141D2F",
            themeBtn: "#fff",
            card: "#1E2A47",
            textNorm: "#fff",
            textBolded: "#FFF",
        },
    };
    const lightStyle = {
        colors: {
            background: "#F6F8FF",
            themeBtn: "#4B6A9B",
            card: "#FEFEFE",
            textNorm: "#697C9A",
            textBolded: "#2B3442",
        },
    };

    const changeTheme = (): void => {
        setSunTheme((prev) => !prev);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "light") {
            setSunTheme(true);
        }
    }, []);

    useEffect(() => {
        const mode = sunTheme ? "light" : "dark";
        localStorage.setItem("theme", mode);
    }, [sunTheme]);

    return (
        <ThemeContext.Provider value={{ changeTheme, sunTheme }}>
            <ThemeProvider theme={sunTheme ? lightStyle : darkStyle}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
};
