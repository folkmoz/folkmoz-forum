"use client";

import { Comment } from "@/lib/api/types";
import { CommentItem } from "@/app/(app)/post/[postId]/_components/CommentItem";
import { User } from "@/lib/auth/utils";
import { memo } from "react";

type CommentListProps = {
    comments: Comment[];
    user: User | null;
    postId: string;
};

const EmptyComments = () => (
    <div className="text-center text-muted-foreground py-8">
        ยังไม่มีคอมเม้นท์เลย คุณเป็นคนแรกที่จะคอมเม้น! คอมเม้นเลย :)
    </div>
);

export const CommentList = memo(
    ({ comments, user, postId }: CommentListProps) => {
        if (!comments.length) {
            return <EmptyComments />;
        }

        return (
            <div className="mt-4 space-y-20">
                {comments.map((comment, index) => (
                    <CommentItem
                        comment={comment}
                        key={comment.id}
                        i={index}
                        currentUser={user}
                        postId={postId}
                    />
                ))}
            </div>
        );
    },
);

CommentList.displayName = "CommentList";
