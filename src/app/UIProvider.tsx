"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export function UIProvider({ children }: { children: React.ReactNode }) {
    const { theme } = useContext(ThemeContext);
    return (
        <body
            className={`${inter.className} ${theme} text-foreground bg-background`}
        >
            <NextUIProvider>{children}</NextUIProvider>
        </body>
    );
}
