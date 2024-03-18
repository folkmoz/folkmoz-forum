import { useOptimistic, useTransition } from "react";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { CommentActionPanel } from "@/app/(app)/post/[postId]/_components/CommentActionPanel";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { FcLike } from "react-icons/fc";
import {
    FaFaceAngry,
    FaFaceSadTear,
    FaFaceSurprise,
    FaRegFaceLaughBeam,
} from "react-icons/fa6";
import { ReactionType } from "@/lib/types";
import {
    cancelReactionToComment,
    reactionToComment,
} from "@/app/(app)/post/[postId]/actions";

const reactionsDisplay = {
    like: BiSolidLike,
    unliked: BiLike,
    love: FcLike,
    haha: FaRegFaceLaughBeam,
    sad: FaFaceSadTear,
    wow: FaFaceSurprise,
    angry: FaFaceAngry,
};

type LikesButtonProps = {
    reaction: ReactionType;
    postId: string;
    commentId: string;
};

export const LikesButton = ({
    reaction,
    postId,
    commentId,
}: LikesButtonProps) => {
    const [pending, startTransition] = useTransition();
    const [liked, toggleAction] = useOptimistic(
        reaction,
        (prev, newReaction: ReactionType) =>
            prev === newReaction ? "unliked" : newReaction,
    );

    const handleLike = () => {
        startTransition(async () => {
            if (liked === "unliked") {
                toggleAction("like");

                await reactionToComment(postId, commentId, "like");
            } else {
                toggleAction("unliked");
                await cancelReactionToComment(postId, commentId);
            }
        });
    };

    const ReactionIcon = reactionsDisplay[reaction];

    return (
        <HoverCard openDelay={400} closeDelay={100}>
            <HoverCardTrigger asChild>
                <button
                    onClick={handleLike}
                    className={cn(
                        "flex items-center gap-2 text-muted-foreground active:scale-95 hover:bg-neutral-200/70 py-3 px-5 rounded-md",
                        {
                            "text-blue-500": reaction === "like",
                            "text-red-500": reaction === "love",
                            "text-yellow-500": reaction === "haha",
                            "text-green-500": reaction === "wow",
                            "text-gray-500": reaction === "sad",
                            "text-gray-900": reaction === "angry",
                        },
                    )}
                >
                    <span>
                        <ReactionIcon size={22} />
                    </span>
                    ถูกใจ
                </button>
            </HoverCardTrigger>
            <HoverCardContent side="top" className="w-full p-0 rounded-full">
                <CommentActionPanel />
            </HoverCardContent>
        </HoverCard>
    );
};
