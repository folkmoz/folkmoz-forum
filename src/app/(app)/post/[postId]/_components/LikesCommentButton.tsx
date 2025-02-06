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
import { Button } from "@/components/ui/button";

type LikesButtonProps = {
    reaction: ReactionType;
    postId: string;
    commentId: string;
};

const reactionColors: Record<ReactionType, string> = {
    like: "text-blue-500",
    love: "text-red-500",
    haha: "text-yellow-500",
    wow: "text-green-500",
    sad: "text-gray-500",
    angry: "text-gray-900",
    unliked: "text-muted-foreground",
};

const reactionsDisplay = {
    like: BiSolidLike,
    unliked: BiLike,
    love: FcLike,
    haha: FaRegFaceLaughBeam,
    sad: FaFaceSadTear,
    wow: FaFaceSurprise,
    angry: FaFaceAngry,
} as const;

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
    const ReactionIcon = useMemo(() => reactionsDisplay[liked], [liked]);

    const handleLike = () => {
        requiredAuth(() => {
            if (pending) return;
            startTransition(async () => {
                const newReaction = liked === "unliked" ? "like" : "unliked";
                const prevReaction = liked;

                toggleAction(newReaction);

                const resp = await (newReaction === "like"
                    ? reactionToComment(postId, commentId, "like")
                    : cancelReactionToComment(postId, commentId));

                if (resp.status === "error") {
                    toast.error(resp.message);
                    toggleAction(prevReaction);
                }
            });
        });
    };

    return (
        <HoverCard openDelay={400} closeDelay={100}>
            <HoverCardTrigger asChild>
                <Button
                    onClick={handleLike}
                    variant="ghost"
                    className={cn(
                        "flex items-center gap-2 active:scale-95 py-3 px-5",
                        reactionColors[liked],
                    )}
                >
                    <ReactionIcon size={22} />
                    ถูกใจ
                </Button>
            </HoverCardTrigger>
            <HoverCardContent side="top" className="w-full p-0 rounded-full">
                <CommentActionPanel />
            </HoverCardContent>
        </HoverCard>
    );
};
