import { Comment } from "@/lib/api/types";
import { useMemo } from "react";
import { timeAgo } from "@/lib/utils";
import { UserProfileImage } from "@/components/UserProfileImage";
import {
    MessageCircleIcon,
    MessageCircleMoreIcon,
    ShareIcon,
    ThumbsUpIcon,
} from "lucide-react";

export const CommentItem = ({
    comment,
    i,
}: {
    comment: Comment;
    i: number;
}) => {
    const timeFromNow = useMemo(() => {
        return timeAgo(comment.createdAt);
    }, []);

    return (
        <div className="relative py-6 px-6 md:px-10 mt-10 bg-[#F7F7F7] rounded-md">
            <span className="absolute -top-7 left-0 text-lg hover:underline text-muted-foreground">
                <a href={"#"} className="inline-flex gap-2">
                    <MessageCircleMoreIcon />
                    ความคิดเห็นที่ {i + 1}
                </a>
            </span>
            <div className="flex gap-5">
                <UserProfileImage
                    image={comment.author.image}
                    name={comment.author.name || "Anonymous"}
                />
                <div className="pt-2">
                    <div className="flex items-center gap-2">
                        <p className="text-lg font-semibold">
                            {comment.author.name}
                        </p>
                        <p className="text-neutral-400">{timeFromNow}</p>
                    </div>
                    <div
                        className="text-lg text-[#444] font-light mt-3"
                        dangerouslySetInnerHTML={{
                            __html: comment.content,
                        }}
                    ></div>
                    <div className="flex mt-8 gap-8">
                        <button className="flex items-center gap-2 text-muted-foreground active:scale-95">
                            <span>
                                <ThumbsUpIcon />
                            </span>
                            ถูกใจ
                        </button>
                        <button className="flex items-center gap-2 text-muted-foreground">
                            <span>
                                <MessageCircleIcon />
                            </span>
                            ตอบกลับ
                        </button>
                        <button className="flex items-center gap-2 text-muted-foreground">
                            <span>
                                <ShareIcon />
                            </span>
                            แชร์
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
