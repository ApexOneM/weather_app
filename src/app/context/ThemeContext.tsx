"use client";

import { createContext, useMemo, useState } from "react";

export const ThemeContext = createContext({
    theme: "dark",
    toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<string>("dark");
    const value = useMemo(
        () => ({
            theme,
            toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
        }),
        [theme]
    );

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
}
