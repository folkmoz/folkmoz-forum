"use client";

import { Comment } from "@/lib/api/types";
import { CommentItem } from "@/app/(app)/post/[postId]/_components/CommentItem";
import { User } from "@/lib/auth/utils";

type CommentListProps = {
    comments: Comment[];
    user: User | null;
    postId: string;
};

export const CommentList = ({ comments, user, postId }: CommentListProps) => {
    return (
        <div className="mt-4 space-y-20">
            {comments.length !== 0 &&
                comments.map((comment, index) => (
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
};
