import { Post } from "@/lib/api/types";
import { PostItem } from "@/app/(app)/posts/_components/PostItem";

export const PostList = ({ posts }: { posts: Post[] }) => {
    return (
        <ul className="border border-muted-foreground/30 divide-y">
            {posts.map((post) => (
                <PostItem key={post.id} post={post} />
            ))}
        </ul>
    );
};
