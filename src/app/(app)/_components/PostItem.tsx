import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import { Post } from "@/lib/api/types";

export const PostItem = ({ post }: { post: Post }) => {
    return (
        <Link href={`/post/${post.id}`} className={"group"}>
            <div className="relative bg-primary-foreground text-primary rounded-lg justify-end shadow">
                <div className="px-4 pb-6 absolute left-0 bottom-0 z-[2] text-primary-foreground">
                    <h4 className="font-normal group-hover:underline xl:text-lg xl:leading-tight">
                        {post.title}
                    </h4>
                </div>
                <div className="before:block before:absolute before:z-[1] before:inset-0 before:bg-gradient-to-b from-transparent to-90% to-black/70 group-hover:to-black before:transition-colors duration-200 ease-in-out"></div>
                <AspectRatio ratio={4 / 3}>
                    <Image
                        src={post.imageCover}
                        alt={`Cover of ${post.title}`}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                    />
                </AspectRatio>
            </div>
        </Link>
    );
};
