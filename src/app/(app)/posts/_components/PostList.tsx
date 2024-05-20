import { Post } from "@/lib/api/types";
import { PostItem } from "@/app/(app)/posts/_components/PostItem";

export const PostList = ({ posts }: { posts: Post[] }) => {
    if (!posts.length) {
        return <p className="text-center my-4">No posts found.</p>;
    }
    return (
        <ul className="border border-muted-foreground/30 divide-y">
            {posts.map((post) => (
                <PostItem key={post.id} post={post} />
            ))}
        </ul>
    );
};
