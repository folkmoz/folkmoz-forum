import { createInstance } from "@/lib/api/Instance";
import { AxiosInstance } from "axios";
import { getUserAuth } from "@/lib/auth/utils";
import { ReactionType } from "@/lib/types";
import { cookies } from "next/headers";

export class CommentController {
    private instance: AxiosInstance;
    private readonly cookies;
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
            {
                headers: {
                    Cookie: this.cookies,
                },
            },
        );

        return resp.status === 200;
    }

    public async cancelReactionToComment(postId: string, commentId: string) {
        await this.checkAuth();

        const resp = await this.instance.delete(
            `/posts/${postId}/comments/${commentId}/reactions`,
            {
                headers: {
                    Cookie: this.cookies,
                },
            },
        );

        return resp.status === 200;
    }
}
