"use client";

import dynamic from "next/dynamic";
import { CustomEditorProps } from "@/components/Custom-editor";

const CustomEditor = dynamic<CustomEditorProps>(
    () => import("@/components/Custom-editor").then((mod) => mod.CustomEditor),
    {
        ssr: false,
    },
);

export const TextEditor = () => {
    return (
        <div>
            <CustomEditor initialData={""} />
        </div>
    );
};
