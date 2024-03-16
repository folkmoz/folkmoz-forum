"use server";

import { CloudinaryAPI } from "@/lib/api/CloudinaryAPI";
import { postController } from "@/lib/api/Post.controller";

type Data = {
    title: string;
    content: string;
    isDefaultImage: boolean;
    image: string;
};

type ActionResp = {
    message: string | null;
    status: "success" | "error";
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

        const response = await postController.createPost(
            data.title,
            data.content,
            uploadResult.secure_url,
        );

        return { message: "Data saved!", status: "success" };
    } catch (error) {
        console.log(error);
        return { message: "Error saving data", status: "error" };
    }
};
