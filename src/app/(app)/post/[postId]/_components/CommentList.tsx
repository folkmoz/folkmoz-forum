"use client";

import { Comment } from "@/lib/api/types";
import { CommentItem } from "@/app/(app)/post/[postId]/_components/CommentItem";

export const CommentList = ({ comments }: { comments: Comment[] }) => {
    return (
        <div className="mt-4 space-y-20">
            {comments.map((comment, index) => (
                <CommentItem comment={comment} key={comment.id} i={index} />
            ))}
        </div>
    );
};
