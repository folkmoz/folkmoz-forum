import { env } from "@/lib/env.mjs";
import { Post } from "@/lib/api/types";
import { PostList } from "@/app/(app)/posts/_components/PostList";
import { ArrowUpDownIcon } from "lucide-react";

async function getAllPosts(): Promise<Post[]> {
    const resp = await fetch(`${env.BACKEND_URL}/posts`);

    return await resp.json();
}

export default async function Page() {
    const posts = await getAllPosts();

    return (
        <>
            <div className="max-w-screen-lg mx-auto pt-20 space-y-8">
                <div className="flex justify-between items-center">
                    <h1>กระทู้ทั้งหมด</h1>

                    <div className="flex gap-2">
                        <span>เรียงลำดับโพสต์โดย:</span>
                        <button>
                            <ArrowUpDownIcon />
                        </button>
                    </div>
                </div>
                <PostList posts={posts} />
            </div>
        </>
    );
}
