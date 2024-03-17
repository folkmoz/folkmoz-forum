import { createInstance } from "@/lib/api/Instance";
import { Post } from "@/lib/api/types";
import { AxiosInstance } from "axios";
import { getUserAuth } from "@/lib/auth/utils";

class PostController {
    private instance: AxiosInstance;
    constructor() {
        this.instance = createInstance();
    }

    private async checkAuth(error?: string) {
        const { session } = await getUserAuth();
        if (!session) throw new Error(error || "Unauthorized");
    }

    public async createComment(postId: string, content: string) {
        await this.checkAuth("You need to be logged in to comment.");

        const resp = await this.instance.post(`/posts/${postId}/comments`, {
            content,
        });

        return resp.data;
    }

    public async createPost(title: string, content: string, image: string) {
        await this.checkAuth("You need to be logged in to create a post.");

        const resp = await this.instance.post("/posts", {
            title,
            content,
            image,
        });

        return resp.data;
    }

    public async getAllPosts(): Promise<Post[]> {
        const resp = await this.instance.get("/posts");

        return resp.data;
    }
}

const postController = new PostController();
export { postController };
