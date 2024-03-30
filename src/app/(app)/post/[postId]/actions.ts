"use server";

import { PostController } from "@/lib/api/Post.controller";
import z from "zod";
import { revalidateTag } from "next/cache";
import { ReactionType } from "@/lib/types";
import { CommentController } from "@/lib/api/Comment.controller";
import { handlerResponse } from "@/lib/utils";
import { ActionResp } from "@/lib/api/types";

const schema = z.object({
    postId: z.string(),
    content: z.string(),
});

export const removeReactionToPost = async (
    postId: string,
): Promise<ActionResp> => {
    try {
        if (!postId) return { message: "Invalid data", status: "error" };

        const postController = new PostController();

        await postController.removeReactionToPost(postId);

        revalidateTag(`post-${postId}`);

        return handlerResponse.ok("Data saved!");
    } catch (error) {
        return handlerResponse.error(error);
    }
};

export const reactionToPost = async (
    postId: string,
    action: ReactionType,
): Promise<ActionResp> => {
    try {
        if (!postId || !action)
            return { message: "Invalid data", status: "error" };

        const postController = new PostController();

        await postController.actionToPost(postId, action);

        revalidateTag(`post-${postId}`);

        return handlerResponse.ok("Data saved!");
    } catch (error) {
        console.log(error);
        return handlerResponse.error(error);
    }
};

export const saveComment = async (formData: FormData): Promise<ActionResp> => {
    try {
        const data = schema.parse({
            postId: formData.get("postId") as string,
            content: formData.get("content") as string,
        });

        if (!data.content || !data.postId)
            return { message: "Invalid data", status: "error" };
        const postController = new PostController();

        await postController.createComment(data.postId, data.content);

        revalidateTag(`post-${data.postId}`);

        return handlerResponse.ok("Data saved!");
    } catch (error) {
        return handlerResponse.error(error);
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

        const commentController = new CommentController();

        await commentController.actionToComment(postId, commentId, action);

        revalidateTag(`post-${postId}`);

        return handlerResponse.ok("Data saved!");
    } catch (error) {
        return handlerResponse.error(error);
    }
};

export const cancelReactionToComment = async (
    postId: string,
    commentId: string,
): Promise<ActionResp> => {
    try {
        if (!postId || !commentId)
            return { message: "Invalid data", status: "error" };

        const commentController = new CommentController();
        await commentController.cancelReactionToComment(postId, commentId);

        revalidateTag(`post-${postId}`);

        return handlerResponse.ok("Data saved!");
    } catch (error) {
        return handlerResponse.error(error);
    }
};
