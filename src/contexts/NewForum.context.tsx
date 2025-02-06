"use client";
import { createContext, useContext, useEffect, useReducer, useMemo } from "react";

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

type NewForumContextType = {
    state: NewForumState;
    setState: (newValue: Partial<NewForumState>) => void;
    resetState: () => void;
};

const NewForumContext = createContext<NewForumContextType | null>(null);

type NewForumAction = {
    type: 'UPDATE' | 'RESET';
    payload?: Partial<NewForumState>;
};

const newForumReducer = (
    state: NewForumState,
    action: NewForumAction
): NewForumState => {
    switch (action.type) {
        case 'UPDATE':
            return { ...state, ...action.payload };
        case 'RESET':
            return initialNewForumState;
        default:
            return state;
    }
};

export const NewForumProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(newForumReducer, initialNewForumState);

    const setState = (newValue: Partial<NewForumState>) => {
        dispatch({ type: 'UPDATE', payload: newValue });
    };

    const resetState = () => {
        dispatch({ type: 'RESET' });
    };

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (state.isSubmitting) {
                e.preventDefault();
                e.returnValue = "Are you sure you want to leave?";
                return e.returnValue;
            }
        };

        if (state.isSubmitting) {
            window.addEventListener("beforeunload", handleBeforeUnload);
            document.body.style.overflow = "hidden";
        }

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            document.body.style.overflow = "auto";
        };
    }, [state.isSubmitting]);

    const contextValue = useMemo(
        () => ({ state, setState, resetState }),
        [state]
    );

    return (
        <NewForumContext.Provider value={contextValue}>
            {children}
        </NewForumContext.Provider>
    );
};

export const useNewForum = (): NewForumContextType => {
    const context = useContext(NewForumContext);
    if (!context) {
        throw new Error("useNewForum must be used within NewForumProvider");
    }
    return context;
};
