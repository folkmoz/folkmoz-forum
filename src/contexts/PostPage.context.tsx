"use client";
import { createContext, useContext, useReducer } from "react";

export const PostPageContext = createContext(
    {} as {
        state: PostPageState;
        setState: (newValue: Partial<PostPageState>) => void;
        resetState: () => void;
    },
);

type PostPageState = {
    isOpenCommentEditor: boolean;
    isOpenActionPanel: boolean;
    comment: string;
};

const initialStatePostPage = {
    isOpenCommentEditor: false,
    isOpenActionPanel: false,
    comment: "",
};

const postPageReducer = (
    state = initialStatePostPage,
    setState: Partial<PostPageState>,
) => {
    return { ...state, ...setState };
};

export const PostPageProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [state, setState] = useReducer(postPageReducer, initialStatePostPage);

    const resetState = () => {
        setState(initialStatePostPage);
    };

    return (
        <PostPageContext.Provider value={{ state, setState, resetState }}>
            {children}
        </PostPageContext.Provider>
    );
};

export const usePostPage = () => {
    const context = PostPageContext;
    if (context === undefined) {
        throw new Error("usePostPage must be used within a PostPageProvider");
    }
    return useContext(context);
};
