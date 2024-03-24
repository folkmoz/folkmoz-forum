"use client";

import { Reactions } from "@/lib/api/types";
import { useMemo } from "react";
import { LikesPostButton } from "@/app/(app)/post/[postId]/_components/LikesPostButton";
import { motion } from "framer-motion";
import { MessageCircleIcon, ShareIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePostPage } from "@/contexts/PostPage.context";
import { useAuth } from "@/hooks/useAuth";
import { ReactionType } from "@/lib/types";

type ActionPanelProps = {
    reactions: Reactions[];
    userId: string;
    postId: string;
};

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export const ActionPanel = ({
    reactions,
    userId,
    postId,
}: ActionPanelProps) => {
    const { state, setState } = usePostPage();
    const { requiredAuth } = useAuth();
    const reaction = useMemo(() => {
        if (!userId) return "unliked";
        const found = reactions.find((r) => r.userId === userId);

        if (!found) return "unliked";
        return found.reactionType;
    }, [reactions, userId]) as ReactionType;

    const toggleCommentEditor = () => {
        requiredAuth(() => {
            if (state.isSubmitting) return;
            setState({
                isOpenCommentEditor: !state.isOpenCommentEditor,
            });
        });
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 max-w-[1244px] mx-auto px-6">
            <div className="relative">
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    className="absolute bottom-40 right-0 flex flex-col gap-4 items-center my-4"
                >
                    <LikesPostButton reaction={reaction} postId={postId} />
                    <button
                        onClick={toggleCommentEditor}
                        className={cn(
                            "p-3 border border-muted-foreground rounded-full bg-primary-foreground hover:bg-primary-foreground transition-all duration-200 ease-in-out",
                            {
                                "rotate-90": state.isOpenCommentEditor,
                            },
                        )}
                    >
                        {state.isOpenCommentEditor ? (
                            <XIcon className="text-muted-foreground" />
                        ) : (
                            <MessageCircleIcon className="text-muted-foreground" />
                        )}
                        <p className="sr-only">Comment</p>
                    </button>

                    <button
                        className={
                            "p-3 border border-muted-foreground rounded-full bg-primary-foreground hover:bg-primary-foreground transition-all duration-200 ease-in-out"
                        }
                    >
                        <ShareIcon className="text-muted-foreground" />
                        <p className="sr-only">Share</p>
                    </button>
                </motion.div>
            </div>
        </div>
    );
};
