"use client"

import { Bookmark } from "@prisma/client";
import React, { useContext } from "react";
import { createContext, ReactNode } from "react";

interface AppContextProps {
    bookmarks: Bookmark[];
    setBookmarks: (bookmarks: Bookmark[]) => void;
}

const AppContext = createContext<AppContextProps | null>(null);

interface AppProviderProps {
    children: ReactNode;
}


export const AppProvider = ({children}: AppProviderProps) => {
    const [bookmarks, setBookmarks] = React.useState<Bookmark[]>([]);
    return (
        <AppContext.Provider value={{bookmarks, setBookmarks}}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContext);

    if (!context) throw new Error ("useAppContext must be used within AppProvider")

    return context;
}