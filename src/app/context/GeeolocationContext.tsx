"use client";

import { createContext, useMemo, useState, useEffect } from "react";

export const GeolocationContext = createContext({
    navigatorIsAllowed: false,
    setNavigatorIsAllowed: (value: boolean) => {},
});

export function GeolocationProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [navigatorIsAllowed, setNavigator] = useState<boolean>(true);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.permissions
                .query({ name: "geolocation" })
                .then(function (result) {
                    if (result.state !== "granted") {
                        setNavigator(false);
                    }
                });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);

    const value = useMemo(
        () => ({
            navigatorIsAllowed,
            setNavigatorIsAllowed: (value: boolean) => {
                setNavigator(value);
            },
        }),
        [navigatorIsAllowed]
    );

    return (
        <GeolocationContext.Provider value={value}>
            {children}
        </GeolocationContext.Provider>
    );
}
