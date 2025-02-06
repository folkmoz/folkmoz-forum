import { Comment } from "@/lib/api/types";
import { useMemo } from "react";
import { timeAgo } from "@/lib/utils";
import { UserProfileImage } from "@/components/UserProfileImage";
import { MessageCircleIcon, ShareIcon } from "lucide-react";
import { User } from "@/lib/auth/utils";
import { LikesCommentButton } from "@/app/(app)/post/[postId]/_components/LikesCommentButton";
import { ReactionType } from "@/lib/types";
import { Button } from "@/components/ui/button";

type CommentItemProps = {
    comment: Comment;
    i: number;
    currentUser: User | null;
    postId: string;
};

const CommentHeader = ({ index }: { index: number }) => (
    <span className="absolute -top-7 left-0 text-lg hover:underline text-muted-foreground">
        <a href="#" className="inline-flex gap-2">
            #ความคิดเห็นที่ {index + 1}
        </a>
    </span>
);

const CommentContent = ({
    author,
    content,
    timestamp,
}: {
    author: Comment["author"];
    content: string;
    timestamp: string;
}) => (
    <div className="flex gap-5">
        <UserProfileImage
            image={author.image}
            name={author.name || "Anonymous"}
        />
        <div className="pt-1">
            <div className="flex items-center gap-2">
                <p className="text-lg font-semibold">{author.name}</p>
                <p className="text-neutral-400">{timestamp}</p>
            </div>
            <div
                className="text-lg text-[#444] font-light mt-3"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    </div>
);

const ActionButton = ({
    icon: Icon,
    children,
}: {
    icon: typeof MessageCircleIcon;
    children: React.ReactNode;
}) => (
    <Button
        variant="ghost"
        className="flex items-center gap-2 text-muted-foreground active:scale-95 hover:bg-neutral-200/70 py-3 px-5 rounded-md"
    >
        <Icon />
        {children}
    </Button>
);

export const CommentItem = ({
    comment,
    i,
    currentUser,
    postId,
}: CommentItemProps) => {
    const timeFromNow = useMemo(
        () => timeAgo(comment.createdAt),
        [comment.createdAt],
    );

    const reaction = useMemo<ReactionType>(() => {
        if (!comment.reactions || !currentUser) return "unliked";

        const userReaction = comment.reactions.find(
            (r) => r.userId === currentUser.id,
        );

        return userReaction
            ? (userReaction.reactionType as ReactionType)
            : "unliked";
    }, [comment.reactions, currentUser]);

    return (
        <div className="relative py-6 px-6 md:px-10 mt-10 bg-[#F7F7F7] rounded-md">
            <CommentHeader index={i} />
            <CommentContent
                author={comment.author}
                content={comment.content}
                timestamp={timeFromNow}
            />
            <div className="flex mt-8">
                <LikesCommentButton
                    reaction={reaction}
                    postId={postId}
                    commentId={comment.id}
                />
                <ActionButton icon={MessageCircleIcon}>ตอบกลับ</ActionButton>
                <ActionButton icon={ShareIcon}>แชร์</ActionButton>
            </div>
        </div>
    );
};
