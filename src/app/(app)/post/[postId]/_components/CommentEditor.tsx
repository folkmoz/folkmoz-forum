"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePostPage } from "@/contexts/PostPage.context";
import { cn } from "@/lib/utils";
import { SendHorizonalIcon } from "lucide-react";
import { useFormStatus } from "react-dom";

const QuillEditor = dynamic(
    () =>
        import("@/app/(app)/post/[postId]/_components/QuillEditor").then(
            (mod) => mod.QuillEditor,
        ),
    { ssr: false },
);

const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
};

export const CommentEditor = () => {
    const { setState, state, resetState } = usePostPage();

    useEffect(() => {
        return () => {
            resetState();
        };
    }, []);

    return (
        <>
            <div className={"fixed bottom-4 left-0 right-0 container"}>
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate={state.isOpenCommentEditor ? "visible" : "hidden"}
                    // animate="visible"
                    // exit="hidden"
                    className={cn(
                        "border-muted-half rounded-md max-w-[calc(100%-80px)] xl:max-w-full",
                        state.isOpenCommentEditor
                            ? ""
                            : "select-none pointer-events-none",
                    )}
                >
                    <QuillEditor />
                    <div className="flex justify-end p-4">
                        <SubmitButton />
                    </div>
                </motion.div>
            </div>
        </>
    );
};

const SubmitButton = () => {
    const { state } = usePostPage();
    const { pending } = useFormStatus();

    const textLengthWithoutTags = state.comment.replace(/<[^>]*>/g, "").length;
    const disabled = pending || textLengthWithoutTags === 0;

    return (
        <button
            type="button"
            disabled={disabled}
            className={cn(
                "bg-primary-foreground text-primary px-2 xs:px-4 py-2 rounded-full border border-primary inline-flex gap-2 items-center justify-center",
                {
                    "opacity-50": disabled,
                },
            )}
        >
            <span className="hidden sm:block">สร้างข้อความตอบกลับ</span>
            <span>
                <SendHorizonalIcon />
            </span>
        </button>
    );
};
