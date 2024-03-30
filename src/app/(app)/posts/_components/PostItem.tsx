import { Post } from "@/lib/api/types";
import Link from "next/link";
import { Eye } from "lucide-react";

export const PostItem = ({ post }: { post: Post }) => {
    const normalizedPost = {
        ...post,
        body: post.body.replace(/<[^>]*>/g, ""),
    };
    return (
        <li key={post.id}>
            <Link href={`/post/${post.id}`}>
                <div className="p-8 hover:bg-muted">
                    <div className="flex">
                        <h4 className="text-justify flex-1">{post.title}</h4>
                        <div className="flex justify-end basis-1/5 gap-2">
                            <Eye />
                            <span>{post.visited}</span>
                        </div>
                    </div>
                    <p className="text-nowrap overflow-ellipsis overflow-hidden">
                        {normalizedPost.body}
                    </p>
                </div>
            </Link>
        </li>
    );
};
