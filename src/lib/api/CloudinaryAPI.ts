import "server-only";
import type { UploadApiResponse } from "cloudinary";
import { env } from "@/lib/env.mjs";
import { cloudinaryV2 } from "@/lib/cloudinary";

export const CloudinaryAPI = {
    async uploadImage(
        imageURI: string,
        isDefaultImage: boolean,
    ): Promise<UploadApiResponse | undefined> {
        if (isDefaultImage) {
            const image = await fetch(env.NEXTAUTH_URL + imageURI);
            const byteArrayBuffer = Buffer.from(await image.arrayBuffer());

            return await new Promise((resolve) => {
                cloudinaryV2.uploader
                    .upload_stream(
                        {
                            upload_preset:
                                env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_COVER_PRESET,
                        },
                        (err, callResult) => resolve(callResult),
                    )
                    .end(byteArrayBuffer);
            });
        } else {
            return await cloudinaryV2.uploader.upload(imageURI, {
                upload_preset: env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_COVER_PRESET,
            });
        }
    },
    async deleteImage(publicId: string) {
        const res = await fetch(
            `${env.NEXT_PUBLIC_CLOUDINARY_URL}/${publicId}?upload_preset=${env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_COVER_PRESET}`,
            {
                method: "DELETE",
            },
        );
        return await res.json();
    },
};
