import { customAlphabet } from "nanoid";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "@/lib/dayjs";

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
