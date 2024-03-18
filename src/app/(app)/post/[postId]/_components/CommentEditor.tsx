"use client";

import dynamic from "next/dynamic";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef } from "react";
import { usePostPage } from "@/contexts/PostPage.context";
import { cn } from "@/lib/utils";
import { SendHorizonalIcon } from "lucide-react";
import { useFormStatus } from "react-dom";
import { saveComment } from "@/app/(app)/post/[postId]/actions";

const QuillEditor = dynamic(
    () =>
        import("@/app/(app)/post/[postId]/_components/QuillEditor").then(
            (mod) => mod.QuillEditor,
        ),
    { ssr: false },
);

const fadeInUp = {
    hidden: {
        opacity: 1,
        y: 100,
    },
    visible: {
        opacity: 1,
        y: -300,
    },
    rest: { opacity: 1, y: -160 },
};

export const CommentEditor = ({ postId }: { postId: string }) => {
    const { state, setState, resetState } = usePostPage();

    const isBlurred = useRef(false);
    const animation = useAnimationControls();

    const onHoverEnd = () => {
        if (state.isSubmitting || !state.isOpenCommentEditor) return;

        if (!isBlurred.current) {
            return;
        }

        animation.start("rest");
    };

    const onBlurred = () => {
        if (state.isSubmitting || !state.isOpenCommentEditor) return;

        isBlurred.current = true;
        animation.start("rest");
    };

    const onFocused = () => {
        if (state.isSubmitting || !state.isOpenCommentEditor) return;

        isBlurred.current = false;
        animation.start("visible");
    };

    const formAction = async (formData: FormData) => {
        setState({ isSubmitting: true });
        formData.append("postId", postId);
        formData.append("content", state.comment);
        const resp = await saveComment(formData);

        if (resp.status === "success") {
            resetState();
            isBlurred.current = false;
            animation.start("hidden");

            setTimeout(() => {
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: "smooth",
                });
            }, 500);
        }
    };

    useEffect(() => {
        if (state.isOpenCommentEditor) {
            animation.start("visible");
        } else {
            animation.start("hidden");
        }
    }, [state.isOpenCommentEditor]);

    return (
        <>
            <div
                className={cn(
                    "fixed bottom-4 left-0 right-0 px-4 max-w-[1076px] mx-auto xl:px-10",
                    state.isOpenCommentEditor
                        ? ""
                        : "select-none pointer-events-none",
                )}
            >
                <div className="relative">
                    <motion.div
                        transition={{
                            duration: 0.5,
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                        }}
                        onHoverStart={() => animation.start("visible")}
                        onHoverEnd={onHoverEnd}
                        onFocus={onFocused}
                        onBlur={onBlurred}
                        variants={fadeInUp}
                        initial="hidden"
                        animate={animation}
                        className="absolute top-0 border-muted-half rounded-md max-w-[calc(100%-80px)] xl:max-w-full w-full bg-white overflow-hidden"
                    >
                        <QuillEditor />
                        <div className="absolute bottom-0 right-0 flex justify-end p-4">
                            <form action={formAction}>
                                <SubmitButton />
                            </form>
                        </div>
                    </motion.div>
                </div>
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
        <>
            {state.isSubmitting ? (
                <div role="status">
                    <svg
                        aria-hidden="true"
                        className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            ) : (
                <button
                    type="submit"
                    disabled={disabled}
                    className={cn(
                        "bg-primary-foreground text-primary px-2 xs:px-6 py-2 rounded-full border border-primary inline-flex gap-2 items-center justify-center active:scale-[0.98] transition-all duration-200 ease-in-out",
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
            )}
        </>
    );
};
