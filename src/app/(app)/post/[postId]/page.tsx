import { Post, Comment } from "@/lib/api/types";
import { env } from "@/lib/env.mjs";
import { PostBody } from "@/app/(app)/post/[postId]/_components/PostBody";
import { cn } from "@/lib/utils";
import { ActionPanel } from "@/app/(app)/post/[postId]/_components/ActionPanel";
import { CommentEditor } from "@/app/(app)/post/[postId]/_components/CommentEditor";
import { CommentCount } from "@/app/(app)/post/[postId]/_components/CommentCount";
import { CommentList } from "@/app/(app)/post/[postId]/_components/CommentList";

interface GetPostByIdResponse extends Post {
    comments: Comment[];
}

async function getPostById(
    id: string,
    cols?: string[],
): Promise<GetPostByIdResponse> {
    let colsStr = cols ? `?cols=${cols.join(",")}` : "";

    const resp = await fetch(env.BACKEND_URL + `/posts/${id}${colsStr}`, {
        headers: {
            "Content-type": "application/json",
        },
        next: {
            tags: [`post-${id}`],
            revalidate: 60 * 60 * 24,
        },
    });

    const data = await resp.json();

    return data[0];
}

export async function generateMetadata({
    params: { postId },
}: {
    params: { postId: string };
}) {
    const post = await getPostById(postId, ["title"]);

    return {
        title: post.title,
    };
}

export default async function PostPage({
    params: { postId },
}: {
    params: { postId: string };
}) {
    const { title, body, imageCover, visited, comments } =
        await getPostById(postId);

    return (
        <div className="flex flex-col pt-8">
            <div className="border border-muted-foreground/50 p-4 rounded-md">
                <div>
                    <h1
                        className={cn("font-semibold text-primary", {
                            "text-2xl sm:text-3xl md:text-4xl":
                                title.length < 30,
                            "text-xl sm:text-2xl md:text-3xl":
                                title.length > 30,
                        })}
                    >
                        #{title}
                    </h1>
                </div>
                <hr className="mt-4 mb-8" />
                <PostBody body={body} />
            </div>
            <CommentCount count={comments ? comments.length : 0} />

            <CommentList comments={comments} />
            <CommentEditor postId={postId} />

            <ActionPanel />
        </div>
    );
}
