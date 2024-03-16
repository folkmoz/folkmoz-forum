"use client";

import { motion } from "framer-motion";
import { ThumbsUpIcon } from "lucide-react";
import { reactionsEnum } from "@/lib/db/schema/auth";

export const ActionButton = () => {
    return (
        <div className="fixed bottom-8 right-8 flex flex-col gap-4 items-center my-4">
            <motion.div
                initial={{ height: 50 }}
                whileHover={{ height: 100 }}
                className="rounded-full border border-muted-foreground flex flex-col"
            >
                <button className="p-3">
                    <ThumbsUpIcon className="text-muted-foreground" />
                    <p className="sr-only">Like</p>
                </button>
                <button className="p-3 ">
                    <ThumbsUpIcon className="text-muted-foreground" />
                    <p className="sr-only">Like</p>
                </button>
            </motion.div>
            <button>Comment</button>
            <button>Share</button>
        </div>
    );
};
