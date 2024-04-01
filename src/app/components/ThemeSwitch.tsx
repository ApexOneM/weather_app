"use client";

import { useContext } from "react";
import { Switch } from "@nextui-org/react";
import { IoMdMoon } from "react-icons/io";
import { MdSunny } from "react-icons/md";

import { ThemeContext } from "../context/ThemeContext";

export default function ThemeSwitch(props: {}) {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <Switch
            name="themeSwitch"
            size="sm"
            color="primary"
            startContent={<MdSunny />}
            endContent={<IoMdMoon />}
            isSelected={theme == "dark" ? true : false}
            onValueChange={toggleTheme}
        ></Switch>
    );
}
