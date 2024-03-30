"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

import { TextEditor } from "@/app/(auth)/forum/new/_components/TextEditor";
import { useNewForum } from "@/contexts/NewForum.context";
import { UploadZone } from "@/app/(auth)/forum/new/_components/UploadZone";
import { saveData } from "@/app/(auth)/forum/new/action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const Form = () => {
    const { state, setState, resetState } = useNewForum();
    const router = useRouter();

    const formAction = async () => {
        setState({ isSubmitting: true });
        const data = {
            title: state.title,
            content: state.content,
            isDefaultImage: !state.image,
            image: state.previewImage,
        };
        const result = await saveData(JSON.stringify(data));

        if (result.status === "success") {
            setState({ isSubmitting: false, isSubmitted: true });
            toast.success("โพสต์สำเร็จ", {
                description: "โพสต์ของคุณถูกสร้างเรียบร้อยแล้ว",
            });
            resetState();
            router.push(`/post/${result.message}`);
        } else {
            setState({ isSubmitting: false });
            toast.error("เกิดข้อผิดพลาด", {
                description:
                    result.message ?? "โพสต์ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
            });
        }
    };

    return (
        <div>
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
                            onChange={(e) =>
                                setState({ title: e.target.value })
                            }
                        />
                        <TextEditor />

                        <SubmitButton />
                    </div>
                </form>
            </div>
            {state.isSubmitting ? (
                <div className="fixed inset-0 z-50 flex justify-center items-center">
                    <div className="absolute z-10 flex flex-col items-center">
                        <div role="status">
                            <svg
                                aria-hidden="true"
                                className="inline w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div className="text-center mt-4 text-primary">
                            กำลังโพสต์...
                        </div>
                    </div>
                    <div className="absolute w-full h-full flex bg-black bg-white/70 "></div>
                </div>
            ) : null}
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
