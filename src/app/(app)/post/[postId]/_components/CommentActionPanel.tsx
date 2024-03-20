import {
    AngryIcon,
    FrownIcon,
    HeartIcon,
    LaughIcon,
    ThumbsDownIcon,
    ThumbsUpIcon,
} from "lucide-react";

const reactions = [
    {
        name: "like",
        icon: ThumbsUpIcon,
    },
    {
        name: "haha",
        icon: LaughIcon,
    },
    {
        name: "love",
        icon: HeartIcon,
    },
    {
        name: "angry",
        icon: AngryIcon,
    },
    {
        name: "sad",
        icon: FrownIcon,
    },
];

export const CommentActionPanel = () => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center px-1">
                {reactions.map((reaction) => (
                    <button
                        key={reaction.name}
                        type="button"
                        className="p-3 group relative"
                    >
                        <reaction.icon className="group-hover:scale-[1.2] group-active:scale-[1.1] text-muted-foreground transition-transform duration-200" />
                        <p className="sr-only">{reaction.name}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};
