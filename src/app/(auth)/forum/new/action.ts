"use server";

import { CloudinaryAPI } from "@/lib/api/CloudinaryAPI";
import { PostController } from "@/lib/api/Post.controller";
import { handlerResponse } from "@/lib/utils";
import { ActionResp } from "@/lib/api/types";

type Data = {
    title: string;
    content: string;
    isDefaultImage: boolean;
    image: string;
};

export const saveData = async (json: string): Promise<ActionResp> => {
    try {
        const data = JSON.parse(json) as Data;
        let uploadResult = await CloudinaryAPI.uploadImage(
            data.image,
            data.isDefaultImage,
        );

        if (!uploadResult) {
            return { message: "Error uploading image", status: "error" };
        }

        const postController = new PostController();
        const resp = await postController.createPost(
            data.title,
            data.content,
            uploadResult.secure_url,
        );

        return handlerResponse.ok("Data saved!");
    } catch (error) {
        return handlerResponse.error(error);
    }
};
