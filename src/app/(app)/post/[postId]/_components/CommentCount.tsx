import { MessageCircleMoreIcon } from "lucide-react";

export const CommentCount = ({ count }: { count: number }) => {
    return (
        <>
            <div className="relative mt-12 mb-8">
                <span className="absolute left-8 -top-5 px-3 py-2 bg-white rounded-md text-muted-foreground inline-flex gap-2">
                    <MessageCircleMoreIcon size={24} />
                    <span className="font-normal">
                        {count === 0
                            ? "ยังไม่มีความคิดเห็น"
                            : `${count} ความคิดเห็น`}
                    </span>
                </span>
                <hr className="border-muted-foreground/50" />
            </div>
        </>
    );
};
