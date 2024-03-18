import Link from "next/link";
import { PostList } from "@/app/(app)/_components/PostList";
import { Suspense } from "react";
import { LoadingPostList } from "@/app/(app)/_components/LoadingPostList";
import { Banner } from "@/components/Banner";

export default function Home() {
    return (
        <>
            <Banner
                title="แชร์ประสบการณ์ของคุณ"
                imageSrc={"/images/Banner.jpg"}
            />
            <div className="flex justify-center my-8">
                <Link href="/forum/new">
                    <button className="py-2 px-4 bg-primary text-primary-foreground rounded-full">
                        สร้างกระทู้ใหม่
                    </button>
                </Link>
            </div>
            <div className="space-y-4 min-h-[500px]">
                <h2>ความสนใจเยอะที่สุด</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
                    <Suspense fallback={<LoadingPostList />}>
                        <PostList />
                    </Suspense>
                </div>
            </div>
        </>
    );
}
