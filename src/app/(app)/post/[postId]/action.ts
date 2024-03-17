"use server";

import { postController } from "@/lib/api/Post.controller";
import z from "zod";
import { revalidateTag } from "next/cache";

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

        if (!data.content || !data.postId) throw new Error("Invalid data");

        await postController.createComment(data.postId, data.content);

        revalidateTag(`post-${data.postId}`);

        return { message: "Data saved!", status: "success" };
    } catch (error) {
        console.log(error);
        return { message: "Error saving data", status: "error" };
    }
};
