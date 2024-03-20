import { useMemo, useOptimistic, useTransition } from "react";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { CommentActionPanel } from "@/app/(app)/post/[postId]/_components/CommentActionPanel";
import { ReactionType } from "@/lib/types";
import {
    cancelReactionToComment,
    reactionToComment,
} from "@/app/(app)/post/[postId]/actions";
import { toast } from "sonner";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { FcLike } from "react-icons/fc";
import {
    FaFaceAngry,
    FaFaceSadTear,
    FaFaceSurprise,
    FaRegFaceLaughBeam,
} from "react-icons/fa6";
import { useAuth } from "@/hooks/useAuth";

type LikesButtonProps = {
    reaction: ReactionType;
    postId: string;
    commentId: string;
};

const reactionsDisplay = {
    like: BiSolidLike,
    unliked: BiLike,
    love: FcLike,
    haha: FaRegFaceLaughBeam,
    sad: FaFaceSadTear,
    wow: FaFaceSurprise,
    angry: FaFaceAngry,
};

export const LikesCommentButton = ({
    reaction,
    postId,
    commentId,
}: LikesButtonProps) => {
    const [pending, startTransition] = useTransition();
    const [liked, toggleAction] = useOptimistic(
        reaction,
        (_, newReact: ReactionType) => newReact,
    );
    const { requiredAuth } = useAuth();

    const handleLike = () => {
        requiredAuth(() => {
            if (pending) return;
            startTransition(async () => {
                if (liked === "unliked") {
                    toggleAction("like");
                    const resp = await reactionToComment(
                        postId,
                        commentId,
                        "like",
                    );
                    if (resp.status === "error") {
                        toast.error(resp.message);
                        toggleAction("unliked");
                    }
                } else {
                    toggleAction("unliked");
                    const resp = await cancelReactionToComment(
                        postId,
                        commentId,
                    );
                    if (resp.status === "error") {
                        toast.error(resp.message);
                        toggleAction("like");
                    }
                }
            });
        });
    };

    const ReactionIcon = useMemo(() => reactionsDisplay[liked], [liked]);

    return (
        <HoverCard openDelay={400} closeDelay={100}>
            <HoverCardTrigger asChild>
                <button
                    onClick={handleLike}
                    className={cn(
                        "flex items-center gap-2 text-muted-foreground active:scale-95 hover:bg-neutral-200/70 py-3 px-5 rounded-md",
                        {
                            "text-blue-500": liked === "like",
                            "text-red-500": liked === "love",
                            "text-yellow-500": liked === "haha",
                            "text-green-500": liked === "wow",
                            "text-gray-500": liked === "sad",
                            "text-gray-900": liked === "angry",
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
