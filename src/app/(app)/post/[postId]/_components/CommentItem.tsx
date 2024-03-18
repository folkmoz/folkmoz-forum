import { Comment } from "@/lib/api/types";
import { useMemo } from "react";
import { timeAgo } from "@/lib/utils";
import { UserProfileImage } from "@/components/UserProfileImage";

import {
    MessageCircleIcon,
    MessageCircleMoreIcon,
    ShareIcon,
} from "lucide-react";
import { User } from "@/lib/auth/utils";
import { LikesButton } from "@/app/(app)/post/[postId]/_components/LikesButton";
import { ReactionType } from "@/lib/types";

type CommentItemProps = {
    comment: Comment;
    i: number;
    currentUser: User | null;
    postId: string;
};

export const CommentItem = ({
    comment,
    i,
    currentUser,
    postId,
}: CommentItemProps) => {
    const timeFromNow = useMemo(() => {
        return timeAgo(comment.createdAt);
    }, []);

    const reaction = useMemo<ReactionType>(() => {
        if (!comment.reactions || !currentUser) return "unliked";
        const haveLiked = !!comment.reactions.find(
            (r) => r.userId === currentUser.id,
        );

        if (!haveLiked) return "unliked";

        return comment.reactions.find((r) => r.userId === currentUser.id)!
            .reactionType as ReactionType;
    }, [comment.reactions, currentUser]);

    return (
        <div className="relative py-6 px-6 md:px-10 mt-10 bg-[#F7F7F7] rounded-md">
            <span className="absolute -top-7 left-0 text-lg hover:underline text-muted-foreground">
                <a href={"#"} className="inline-flex gap-2">
                    <MessageCircleMoreIcon />
                    ความคิดเห็นที่ {i + 1}
                </a>
            </span>
            <div className="flex gap-5">
                <UserProfileImage
                    image={comment.author.image}
                    name={comment.author.name || "Anonymous"}
                />
                <div className="pt-1">
                    <div className="flex items-center gap-2">
                        <p className="text-lg font-semibold">
                            {comment.author.name}
                        </p>
                        <p className="text-neutral-400">{timeFromNow}</p>
                    </div>
                    <div
                        className="text-lg text-[#444] font-light mt-3"
                        dangerouslySetInnerHTML={{
                            __html: comment.content,
                        }}
                    ></div>
                </div>
            </div>
            <div className="flex mt-8">
                <LikesButton
                    reaction={reaction}
                    postId={postId}
                    commentId={comment.id}
                />
                <button className="flex items-center gap-2 text-muted-foreground active:scale-95 hover:bg-neutral-200/70 py-3 px-5 rounded-md">
                    <span>
                        <MessageCircleIcon />
                    </span>
                    ตอบกลับ
                </button>
                <button className="flex items-center gap-2 text-muted-foreground active:scale-95 hover:bg-neutral-200/70 py-3 px-5 rounded-md">
                    <span>
                        <ShareIcon />
                    </span>
                    แชร์
                </button>
            </div>
        </div>
    );
};
