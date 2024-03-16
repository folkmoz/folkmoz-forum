"use client";
import { createContext, useContext, useEffect, useReducer } from "react";

type NewForumState = {
    title: string;
    content: string;
    image: File | null;
    previewImage: string | null;
    tags: string[];
    isSubmitting: boolean;
    isSubmitted: boolean;
    error: string | null;
};

const initialNewForumState = {
    title: "",
    content: "",
    image: null,
    previewImage: null,
    tags: [],
    isSubmitting: false,
    isSubmitted: false,
    error: null,
} satisfies NewForumState;

const NewForumContext = createContext(
    {} as {
        state: NewForumState;
        setState: (newValue: Partial<NewForumState>) => void;
        resetState: () => void;
    },
);

const newForumReducer = (
    state: NewForumState = initialNewForumState,
    newValue: Partial<NewForumState>,
) => {
    return { ...state, ...newValue };
};

export const NewForumProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [state, setState] = useReducer(newForumReducer, initialNewForumState);

    const resetState = () => {
        setState(initialNewForumState);
    };

    return (
        <NewForumContext.Provider value={{ state, setState, resetState }}>
            {children}
        </NewForumContext.Provider>
    );
};

export const useNewForum = () => {
    const context = NewForumContext;
    if (context === undefined) {
        throw new Error("useNewForum must be used within NewForumProvider");
    }
    return useContext(context);
};
