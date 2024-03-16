import { v2 as cloudinary } from "cloudinary";
import { env } from "@/lib/env.mjs";

cloudinary.config({
    cloud_name: "folk-images",
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
});

export const cloudinaryV2 = cloudinary;
