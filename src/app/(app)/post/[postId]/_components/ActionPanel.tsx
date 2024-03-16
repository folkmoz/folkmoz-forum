"use client";

import { motion } from "framer-motion";
import {
    AngryIcon,
    FrownIcon,
    HeartIcon,
    LaughIcon,
    MessageCircleIcon,
    ShareIcon,
    ThumbsDownIcon,
    ThumbsUpIcon,
    XIcon,
} from "lucide-react";
import { usePostPage } from "@/contexts/PostPage.context";
import { cn } from "@/lib/utils";

const ActionButton = ({
    act,
    Icon,
    className,
    onClick,
}: {
    act: string;
    Icon: React.FC<React.SVGAttributes<SVGElement>>;
    className?: string;
    onClick?: () => void;
}) => {
    return (
        <motion.button
            onClick={onClick}
            className={cn("p-3 group relative", className)}
        >
            <Icon className="group-hover:scale-[1.2] group-active:scale-[1.1] text-muted-foreground transition-transform duration-200" />
            <p className="sr-only">{act}</p>
        </motion.button>
    );
};

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export const ActionPanel = () => {
    const { state, setState } = usePostPage();

    return (
        <div className="fixed bottom-0 left-0 right-0 max-w-[1244px] mx-auto px-6">
            <div className="relative">
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    className="absolute bottom-20 right-0 flex flex-col gap-4 items-center my-4"
                >
                    <motion.div
                        initial={{ height: 50 }}
                        whileHover={{ height: "auto" }}
                        className="rounded-full border border-muted-foreground flex flex-col-reverse overflow-hidden bg-primary-foreground"
                    >
                        <ActionButton act="Like" Icon={ThumbsUpIcon} />
                        <ActionButton act="Unlike" Icon={ThumbsDownIcon} />
                        <ActionButton act="Love" Icon={HeartIcon} />
                        <ActionButton act="Haha" Icon={LaughIcon} />
                        <ActionButton act="Sad" Icon={FrownIcon} />
                        <ActionButton act="Angry" Icon={AngryIcon} />
                    </motion.div>
                    <button
                        onClick={() =>
                            setState({
                                isOpenCommentEditor: !state.isOpenCommentEditor,
                            })
                        }
                        className={cn(
                            "p-3 border border-muted-foreground rounded-full hover:bg-muted-foreground/5 transition-all duration-200 ease-in-out",
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
                            "p-3 border border-muted-foreground rounded-full hover:bg-muted-foreground/5 transition-all duration-200 ease-in-out"
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
