import { customAlphabet } from "nanoid";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "@/lib/dayjs";
import { ActionResp } from "@/lib/api/types";

type FileWithPreview = File & { preview: string };

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const nanoid = customAlphabet(
    "abcdefghijklmnopqrstuvwxyz0123456789",
    12,
);

export const timeAgo = (date: Date | string) => {
    return dayjs(date).tz("Asia/Bangkok").fromNow();
};

export const handlerResponse = {
    ok: (message: string): ActionResp => {
        return {
            message,
            status: "success",
        };
    },
    error: (error: unknown): ActionResp => {
        if (error instanceof Object && "response" in error) {
            const { data } = error.response as any;
            return { message: data.message, status: "error" };
        }

        if (error instanceof Error) {
            return { message: error.message, status: "error" };
        }
        return {
            message: "Something went wrong!, please try again later.",
            status: "error",
        };
    },
};

export const fileToDataUri = (
    image: File,
): PromiseLike<Partial<FileWithPreview>> => {
    return new Promise((res) => {
        const reader = new FileReader();
        const { type, name, size } = image;
        reader.addEventListener("load", () => {
            res({
                preview: reader.result as string,
                name: name,
                type,
                size: size,
            });
        });
        reader.readAsDataURL(image);
    });
};

export const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
