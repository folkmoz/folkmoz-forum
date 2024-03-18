import { createInstance } from "@/lib/api/Instance";
import { AxiosInstance } from "axios";
import { getUserAuth } from "@/lib/auth/utils";
import { ReactionType } from "@/lib/types";

class CommentController {
    private instance: AxiosInstance;
    constructor() {
        this.instance = createInstance();
    }

    private async checkAuth(error?: string) {
        const { session } = await getUserAuth();
        if (!session) throw new Error(error || "Unauthorized");
    }

    public async actionToComment(
        postId: string,
        commentId: string,
        action: ReactionType,
    ) {
        await this.checkAuth();

        const resp = await this.instance.post(
            `/posts/${postId}/comments/${commentId}/reactions`,
            {
                action,
            },
        );

        return resp.status === 200;
    }

    public async cancelReactionToComment(postId: string, commentId: string) {
        await this.checkAuth();

        const resp = await this.instance.delete(
            `/posts/${postId}/comments/${commentId}/reactions`,
        );

        return resp.status === 200;
    }
}

const commentController = new CommentController();
export { commentController };
