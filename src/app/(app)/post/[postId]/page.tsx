import { Post, Comment, Reactions } from "@/lib/api/types";
import { env } from "@/lib/env.mjs";
import { ActionPanel } from "@/app/(app)/post/[postId]/_components/ActionPanel";
import { CommentEditor } from "@/app/(app)/post/[postId]/_components/CommentEditor";
import { CommentCount } from "@/app/(app)/post/[postId]/_components/CommentCount";
import { CommentList } from "@/app/(app)/post/[postId]/_components/CommentList";
import { getUserAuth } from "@/lib/auth/utils";
import { PostHeader } from "@/app/(app)/post/[postId]/_components/PostHeader";

interface GetPostByIdResponse extends Post {
    comments: Comment[];
    reactions: Reactions[];
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
    const { title, body, imageCover, visited, comments, reactions } =
        await getPostById(postId);

    const { session } = await getUserAuth();
    const user = session?.user || null;

    return (
        <div className="flex flex-col pt-8">
            <PostHeader title={title} body={body} reactions={reactions} />
            <CommentCount count={comments ? comments.length : 0} />

            <CommentList comments={comments} user={user} postId={postId} />
            {user && <CommentEditor postId={postId} />}

            <ActionPanel
                reactions={reactions}
                userId={user?.id || ""}
                postId={postId}
            />
        </div>
    );
}
