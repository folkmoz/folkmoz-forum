import { Reactions } from "@/lib/api/types";
import { cn } from "@/lib/utils";
import { PostBody } from "@/app/(app)/post/[postId]/_components/PostBody";
import { useMemo } from "react";
import { LaughIcon, ThumbsUpIcon } from "lucide-react";

type PostHeaderProps = {
    body: string;
    title: string;
    reactions: Reactions[];
};

export const PostHeader = ({ body, title, reactions }: PostHeaderProps) => {
    return (
        <div className="border border-muted-foreground/50 p-4 rounded-md">
            <div>
                <h1
                    className={cn("font-semibold text-primary", {
                        "text-2xl sm:text-3xl md:text-4xl": title.length < 30,
                        "text-xl sm:text-2xl md:text-3xl": title.length > 30,
                    })}
                >
                    #{title}
                </h1>
            </div>
            <hr className="mt-4 mb-8" />
            <PostBody body={body} />
            {reactions.length > 0 && <DisplayReactions reactions={reactions} />}
        </div>
    );
};

const DisplayReactions = ({ reactions }: { reactions: Reactions[] }) => {
    const displayReactions = useMemo(() => {
        const findReaction = (reactionType: string) =>
            !!reactions.find((r) => r.reactionType === reactionType);

        return {
            like: findReaction("like"),
            love: findReaction("love"),
            haha: findReaction("haha"),
            sad: findReaction("sad"),
            wow: findReaction("wow"),
        };
    }, []);

    return (
        <div className="mt-8">
            <div className="flex gap-3 items-center">
                <div className="flex">
                    <span className="relative z-1 -mr-2 inline-flex justify-center items-center size-8 rounded-full bg-primary-foreground border border-muted-foreground">
                        <ThumbsUpIcon
                            size={20}
                            className="text-muted-foreground"
                        />
                    </span>
                    <span className="inline-flex justify-center items-center size-8 rounded-full bg-primary-foreground border border-muted-foreground">
                        <LaughIcon
                            size={22}
                            className="text-muted-foreground"
                        />
                    </span>
                </div>
                <div className="text-3xl font-semibold text-muted-foreground/50 ">
                    {reactions.length}
                </div>
            </div>
        </div>
    );
};
