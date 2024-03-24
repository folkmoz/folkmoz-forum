import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    AngryIcon,
    FrownIcon,
    HeartIcon,
    LaughIcon,
    ThumbsUpIcon,
} from "lucide-react";
import { useTransition, useOptimistic, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { ReactionType } from "@/lib/types";
import { BiLike, BiSolidLike } from "react-icons/bi";
import {
    FaFaceAngry,
    FaFaceSadTear,
    FaFaceSurprise,
    FaRegFaceLaughBeam,
} from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import {
    reactionToPost,
    removeReactionToPost,
} from "@/app/(app)/post/[postId]/actions";

type LikesPostButtonProps = {
    reaction: ReactionType;
    postId: string;
};

const reactionsDisplay = {
    like: BiSolidLike,
    unliked: BiLike,
    love: FaHeart,
    haha: FaRegFaceLaughBeam,
    sad: FaFaceSadTear,
    wow: FaFaceSurprise,
    angry: FaFaceAngry,
};

export const LikesPostButton = ({ reaction, postId }: LikesPostButtonProps) => {
    const [pending, startTransition] = useTransition();
    const [isExpanded, setExpanded] = useState(false);
    const [liked, toggleAction] = useOptimistic(
        reaction,
        (_, newReact: ReactionType) => newReact,
    );

    const delay = useRef<NodeJS.Timeout | null>();

    const { isLoggedIn, requiredAuth } = useAuth();

    const ReactionIcon = reactionsDisplay[liked];

    const textUsed = {
        "group-hover:text-blue-400": liked === "like",
        "group-hover:text-red-400": liked === "love",
        "group-hover:text-yellow-400": liked === "haha",
        "group-hover:text-gray-400": liked === "sad",
        "group-hover:text-red-500": liked === "angry",
    } as Partial<Record<ReactionType, string>>;

    const colorUsed = {
        like: "rgb(96, 165, 250)",
        love: "rgb(248, 113, 113)",
        haha: "rgb(250, 204, 21)",
        sad: "rgb(156, 163, 175)",
        angry: "rgb(220, 38, 38)",
        unliked: "rgb(115, 115, 115)",
    } as Partial<Record<ReactionType, string>>;

    const handleReaction = (newReact: ReactionType) => {
        requiredAuth(() => {
            if (pending) return;
            startTransition(async () => {
                toggleAction(newReact);
                if (newReact !== "unliked") {
                    const resp = await reactionToPost(postId, newReact);
                } else {
                    const resp = await removeReactionToPost(postId);
                }

                setExpanded(false);
            });
        });
    };

    const onHoverStart = () => {
        if (!isLoggedIn) return;
        if (delay.current) {
            clearTimeout(delay.current);
        }
        delay.current = setTimeout(() => {
            setExpanded(true);
        }, 500);
    };

    const onHoverEnd = () => {
        if (delay.current) {
            clearTimeout(delay.current);
        }
        setExpanded(false);
    };

    return (
        <>
            <motion.div
                initial={{
                    height: 50,
                    backgroundColor:
                        liked === "unliked" ? "#fff" : colorUsed[liked],
                    borderColor:
                        liked === "unliked"
                            ? colorUsed[liked]
                            : colorUsed[liked],
                }}
                whileHover={{
                    height: isExpanded ? 250 : 50,
                    backgroundColor: "#fff",
                    borderColor: colorUsed[liked],
                    transition: {
                        type: "spring",
                        stiffness: 200,
                        damping: 30,
                    },
                }}
                onHoverStart={onHoverStart}
                onHoverEnd={onHoverEnd}
                className={cn(
                    "relative rounded-full border flex flex-col-reverse overflow-hidden group hover:bg-primary-foreground",
                )}
            >
                {liked !== "unliked" && (
                    <motion.button
                        onClick={() => handleReaction("unliked")}
                        className={cn(
                            " bottom-0 p-3 group/item relative rounded-full transition-all duration-200 ease-in-out",
                        )}
                    >
                        <ReactionIcon
                            size={24}
                            className={cn(
                                "group-hover:scale-[1.2] group-active:scale-[1.1] transition-transform duration-200 text-white",
                                textUsed,
                            )}
                        />
                        <p className="sr-only">คลิกเพื่อยกเลิก</p>
                    </motion.button>
                )}
                {liked !== "like" && (
                    <motion.button
                        onClick={() => handleReaction("like")}
                        className={cn("p-3 group/item relative")}
                    >
                        <ThumbsUpIcon
                            className={cn(
                                "group-hover/item:scale-[1.2] group-active/item:scale-[1.1] transition-transform duration-200 group-hover:text-muted-foreground",

                                liked === "unliked"
                                    ? "text-muted-foreground"
                                    : "text-white",
                            )}
                        />
                        <p className="sr-only">Like</p>
                    </motion.button>
                )}

                {liked !== "love" && (
                    <ActionButton
                        act="Love"
                        Icon={HeartIcon}
                        onClick={() => handleReaction("love")}
                    />
                )}
                {liked !== "haha" && (
                    <ActionButton
                        act="Haha"
                        Icon={LaughIcon}
                        onClick={() => handleReaction("haha")}
                    />
                )}
                {liked !== "sad" && (
                    <ActionButton
                        act="Sad"
                        Icon={FrownIcon}
                        onClick={() => handleReaction("sad")}
                    />
                )}
                {liked !== "angry" && (
                    <ActionButton
                        act="Angry"
                        Icon={AngryIcon}
                        onClick={() => handleReaction("angry")}
                    />
                )}
            </motion.div>
        </>
    );
};

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
            className={cn("p-3 group/item relative", className)}
        >
            <Icon className="group-hover/item:scale-[1.2] group-active/item:scale-[1.1] text-white transition-transform duration-200 group-hover:text-muted-foreground" />
            <p className="sr-only">{act}</p>
        </motion.button>
    );
};
