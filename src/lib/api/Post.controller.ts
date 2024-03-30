import { createInstance } from "@/lib/api/Instance";
import { Post } from "@/lib/api/types";
import { AxiosInstance } from "axios";
import { getUserAuth } from "@/lib/auth/utils";
import { cookies } from "next/headers";

export class PostController {
    private instance: AxiosInstance;
    private cookies;
    constructor() {
        this.instance = createInstance();
        this.cookies = cookies()
            .getAll()
            .map((c) => `${c.name}=${c.value}`);
    }

    private async checkAuth(error?: string) {
        const { session } = await getUserAuth();
        if (!session) throw new Error(error || "Unauthorized");
    }

    public async actionToPost(postId: string, action: string) {
        await this.checkAuth("You need to be logged in to react.");

        const resp = await this.instance.post(`/posts/${postId}/reactions`, {
            action,
        });

        return resp.data;
    }

    public async removeReactionToPost(postId: string) {
        await this.checkAuth("You need to be logged in to remove reaction.");

        const resp = await this.instance.delete(`/posts/${postId}/reactions`);

        return resp.data;
    }

    public async createComment(postId: string, content: string) {
        await this.checkAuth("You need to be logged in to comment.");

        const resp = await this.instance.post(`/posts/${postId}/comments`, {
            content,
        });

        return resp.data;
    }

    public async createPost(
        title: string,
        content: string,
        image: string,
    ): Promise<{ insertedId: string; fromUser: string }[]> {
        await this.checkAuth("You need to be logged in to create a post.");

        const resp = await this.instance.post("/posts", {
            title,
            content,
            image,
        });

        return resp.data;
    }
}
