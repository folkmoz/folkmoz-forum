import { createInstance } from "@/lib/api/Instance";
import { Post } from "@/lib/api/types";
import { AxiosInstance } from "axios";

class PostController {
    private instance: AxiosInstance;
    constructor() {
        this.instance = createInstance();
    }

    public async createPost(title: string, content: string, image: string) {
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

    public async getPostById(id: string): Promise<Post> {
        const resp = await this.instance.get(`/posts/${id}`);

        return resp.data;
    }
}

const postController = new PostController();
export { postController };
