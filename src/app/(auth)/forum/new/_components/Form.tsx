"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

import { TextEditor } from "@/app/(auth)/forum/new/_components/TextEditor";
import { useNewForum } from "@/contexts/NewForum.context";
import { UploadZone } from "@/app/(auth)/forum/new/_components/UploadZone";
import { saveData } from "@/app/(auth)/forum/new/action";
import axios from "axios";
import { FormEventHandler } from "react";
import { useToast } from "@/components/ui/use-toast";

export const Form = () => {
    const { state, setState } = useNewForum();
    const { toast } = useToast();

    const formAction = async () => {
        setState({ isSubmitting: true });
        const data = {
            title: state.title,
            content: state.content,
            isDefaultImage: !state.image,
            image: state.previewImage,
        };
        const resp = await saveData(JSON.stringify(data));

        if (resp.status === "success") {
            setState({ isSubmitting: false });
            toast({
                title: "สำเร็จ!",
                description: "โพสต์ของคุณถูกสร้างแล้ว",
            });
        }
    };

    return (
        <div className="py-10 max-w-[1076px] mx-auto">
            <form action={formAction}>
                <UploadZone />
                <div className="space-y-8">
                    <input
                        className={cn(
                            "font-semibold text-primary outline-none w-full text-center placeholder:text-gray-200 transition-all duration-500 ease-in-out",
                            state.title.length > 30
                                ? "text-xl md:text-3xl"
                                : "text-3xl md:text-6xl",
                        )}
                        required
                        type="text"
                        placeholder="หัวข้อเรื่องของคุณ"
                        value={state.title}
                        onChange={(e) => setState({ title: e.target.value })}
                    />
                    <TextEditor />

                    <SubmitButton />
                </div>
            </form>
        </div>
    );
};

const SubmitButton = () => {
    const { state } = useNewForum();
    const { pending } = useFormStatus();

    const isDisabled =
        !state.title || !state.content || !state.previewImage || pending;

    return (
        <div>
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isDisabled}
                    className="w-32 py-3 text-white bg-primary rounded-md disabled:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    โพสต์
                </button>
            </div>
        </div>
    );
};
