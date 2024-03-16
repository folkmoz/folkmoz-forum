"use client";

import { motion } from "framer-motion";
import {
    AngryIcon,
    FrownIcon,
    HeartIcon,
    LaughIcon,
    MessageCircleIcon,
    ShareIcon,
    ThumbsDownIcon,
    ThumbsUpIcon,
} from "lucide-react";

const ActionButton = ({
    act,
    Icon,
}: {
    act: string;
    Icon: React.FC<React.SVGAttributes<SVGElement>>;
}) => {
    return (
        <motion.button className="group p-3 relative">
            <Icon className="text-muted-foreground group-hover:scale-[1.2] group-active:scale-[1.1] transition-transform duration-200" />
            <p className="sr-only">{act}</p>
        </motion.button>
    );
};

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export const ActionPanel = () => {
    return (
        <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="fixed bottom-8 right-8 flex flex-col gap-4 items-center my-4"
        >
            <motion.div
                initial={{ height: 50 }}
                whileHover={{ height: "auto" }}
                className="rounded-full border border-muted-foreground flex flex-col-reverse overflow-hidden"
            >
                <ActionButton act="Like" Icon={ThumbsUpIcon} />
                <ActionButton act="Unlike" Icon={ThumbsDownIcon} />
                <ActionButton act="Love" Icon={HeartIcon} />
                <ActionButton act="Haha" Icon={LaughIcon} />
                <ActionButton act="Sad" Icon={FrownIcon} />
                <ActionButton act="Angry" Icon={AngryIcon} />
            </motion.div>
            <button
                className={
                    "p-3 border border-muted-foreground rounded-full hover:bg-muted-foreground/5 transition-all duration-200 ease-in-out"
                }
            >
                <MessageCircleIcon className="text-muted-foreground" />
                <p className="sr-only">Comment</p>
            </button>
            <button
                className={
                    "p-3 border border-muted-foreground rounded-full hover:bg-muted-foreground/5 transition-all duration-200 ease-in-out"
                }
            >
                <ShareIcon className="text-muted-foreground" />
                <p className="sr-only">Share</p>
            </button>
        </motion.div>
    );
};
