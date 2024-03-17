import {
    AngryIcon,
    FrownIcon,
    HeartIcon,
    LaughIcon,
    ThumbsDownIcon,
    ThumbsUpIcon,
} from "lucide-react";

export const CommentActionPanel = () => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <button type="button" className="p-3 group relative">
                    <ThumbsUpIcon className="group-hover:scale-[1.2] group-active:scale-[1.1] text-muted-foreground transition-transform duration-200" />
                    <p className="sr-only">Like</p>
                </button>
                <button type="button" className="p-3 group relative">
                    <ThumbsDownIcon className="group-hover:scale-[1.2] group-active:scale-[1.1] text-muted-foreground transition-transform duration-200" />
                    <p className="sr-only">Dislike</p>
                </button>
                <button type="button" className="p-3 group relative">
                    <LaughIcon className="group-hover:scale-[1.2] group-active:scale-[1.1] text-muted-foreground transition-transform duration-200" />
                    <p className="sr-only">Haha</p>
                </button>
                <button type="button" className="p-3 group relative">
                    <HeartIcon className="group-hover:scale-[1.2] group-active:scale-[1.1] text-muted-foreground transition-transform duration-200" />
                    <p className="sr-only">Love</p>
                </button>
                <button type="button" className="p-3 group relative">
                    <AngryIcon className="group-hover:scale-[1.2] group-active:scale-[1.1] text-muted-foreground transition-transform duration-200" />
                    <p className="sr-only">Angry</p>
                </button>
                <button type="button" className="p-3 group relative">
                    <FrownIcon className="group-hover:scale-[1.2] group-active:scale-[1.1] text-muted-foreground transition-transform duration-200" />
                    <p className="sr-only">Sad</p>
                </button>
            </div>
        </div>
    );
};
