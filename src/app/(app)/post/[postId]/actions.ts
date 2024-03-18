"use server";

import { postController } from "@/lib/api/Post.controller";
import z from "zod";
import { revalidateTag } from "next/cache";
import { ReactionType } from "@/lib/types";
import { commentController } from "@/lib/api/Comment.controller";
import { reactions } from "@/lib/db/schema/auth";

type ActionResp = {
    message: string | null;
    status: "success" | "error";
};

const schema = z.object({
    postId: z.string(),
    content: z.string(),
});

export const saveComment = async (formData: FormData): Promise<ActionResp> => {
    try {
        const data = schema.parse({
            postId: formData.get("postId") as string,
            content: formData.get("content") as string,
        });

        if (!data.content || !data.postId)
            return { message: "Invalid data", status: "error" };

        await postController.createComment(data.postId, data.content);

        revalidateTag(`post-${data.postId}`);

        return { message: "Data saved!", status: "success" };
    } catch (error) {
        console.log(error);
        return { message: "Error saving data", status: "error" };
    }
};

export const reactionToComment = async (
    postId: string,
    commentId: string,
    action: ReactionType,
): Promise<ActionResp> => {
    try {
        if (!postId || !commentId || !action)
            return { message: "Invalid data", status: "error" };

        await commentController.actionToComment(postId, commentId, action);

        revalidateTag(`post-${postId}`);

        return { message: "", status: "success" };
    } catch (error) {
        console.log(error);
        return {
            message:
                error instanceof Error ? error.message : "Error saving data",
            status: "error",
        };
    }
};

export const cancelReactionToComment = async (
    postId: string,
    commentId: string,
): Promise<ActionResp> => {
    try {
        if (!postId || !commentId)
            return { message: "Invalid data", status: "error" };

        const is = await commentController.cancelReactionToComment(
            postId,
            commentId,
        );

        revalidateTag(`post-${postId}`);

        return { message: "", status: "success" };
    } catch (error) {
        console.log(error);
        return {
            message:
                error instanceof Error ? error.message : "Error saving data",
            status: "error",
        };
    }
};
