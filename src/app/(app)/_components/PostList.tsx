import { postController } from "@/lib/api/Post.controller";
import { PostItem } from "@/app/(app)/_components/PostItem";

export const PostList = async () => {
    const posts = await postController.getAllPosts();

    return (
        <>
            {posts.map((post) => (
                <PostItem post={post} key={post.id} />
            ))}
        </>
    );
};
