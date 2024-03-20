import { PostItem } from "@/app/(app)/_components/PostItem";
import { env } from "@/lib/env.mjs";
import { Post } from "@/lib/api/types";
async function getPosts(): Promise<Post[]> {
    const backendUrl = env.BACKEND_URL;
    const res = await fetch(`${backendUrl}/posts`, {
        next: {
            revalidate: 60,
            tags: ["posts"],
        },
    });
    return await res.json();
}

export const PostList = async () => {
    const posts = await getPosts();
    return (
        <>
            {posts.map((post) => (
                <PostItem post={post} key={post.id} />
            ))}
        </>
    );
};
