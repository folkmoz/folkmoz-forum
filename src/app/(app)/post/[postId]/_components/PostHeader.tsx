import { Owner, Reactions } from "@/lib/api/types";
import { cn, timeAgo } from "@/lib/utils";
import { PostBody } from "@/app/(app)/post/[postId]/_components/PostBody";
import { useMemo } from "react";
import { BiSolidLike } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import {
    FaFaceAngry,
    FaFaceSadTear,
    FaFaceSurprise,
    FaRegFaceLaughBeam,
} from "react-icons/fa6";
import { UserProfileImage } from "@/components/UserProfileImage";
import { Separator } from "@/components/ui/separator";

type PostHeaderProps = {
    body: string;
    title: string;
    owner: Owner;
    createdAt: Date;
    reactions: Reactions[];
};

const reactionsDisplay = {
    like: BiSolidLike,
    love: FaHeart,
    haha: FaRegFaceLaughBeam,
    sad: FaFaceSadTear,
    wow: FaFaceSurprise,
    angry: FaFaceAngry,
};

export const PostHeader = ({
    body,
    title,
    reactions,
    owner,
    createdAt,
}: PostHeaderProps) => {
    return (
        <div className="border border-muted-foreground/50 p-4 px-12 rounded-md">
            <div>
                <h1
                    className={cn("font-semibold text-primary relative", {
                        "text-2xl sm:text-3xl md:text-4xl": title.length < 30,
                        "text-xl sm:text-2xl md:text-3xl": title.length > 30,
                    })}
                >
                    <span className="absolute -left-8">#</span>
                    {title}
                </h1>
            </div>
            <hr className="mt-4 mb-8" />
            <PostBody body={body} />
            <div className="flex items-center mt-8 gap-4">
                {reactions.length > 0 && (
                    <>
                        <DisplayReactions reactions={reactions} />
                        <Separator
                            orientation="horizontal"
                            className="h-10 w-0.5"
                        />
                    </>
                )}
                <div className="flex gap-2 items-center">
                    <UserProfileImage
                        name={owner.name}
                        size={"sm"}
                        image={owner.image}
                    />
                    <div>
                        <p className="text-md text-muted-foreground">
                            {owner.name}
                        </p>
                        <p className="text-xs text-primary underline">
                            {timeAgo(createdAt)}
                        </p>
                    </div>
                </div>
            </div>
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
            angry: findReaction("angry"),
        };
    }, []);

    return (
        <div>
            <div className="flex gap-3 items-center">
                <div className="flex">
                    {Object.keys(displayReactions).map((reaction, idx) => {
                        // @ts-ignore
                        if (displayReactions[reaction]) {
                            // @ts-ignore
                            const Icon = reactionsDisplay[reaction];
                            return (
                                <span
                                    key={reaction}
                                    className={cn(
                                        "inline-flex justify-center items-center size-8 rounded-full bg-primary-foreground border border-muted-foreground -mr-1",
                                        {
                                            // relative: idx === 0,
                                        },
                                    )}
                                >
                                    <Icon
                                        size={20}
                                        className="text-muted-foreground"
                                    />
                                </span>
                            );
                        }
                        return null;
                    })}
                </div>
                <div className="text-3xl font-semibold text-muted-foreground/50 ">
                    {reactions.length}
                </div>
            </div>
        </div>
    );
};
