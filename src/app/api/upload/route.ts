import banner from "../../../public/images/Banner.jpg";
import { cloudinaryV2 } from "@/lib/cloudinary";

export async function POST(request: Request) {
    const resp = await cloudinaryV2.uploader.upload(
        "https://instagram.fbkk13-1.fna.fbcdn.net/v/t51.29350-15/339150258_1605901033213832_9008523205556113389_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE4MDAuc2RyIn0&_nc_ht=instagram.fbkk13-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=wdgYsLxq1c4AX_uVMqH&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=MzA3MzM1NjU1NTQzMzYyNTYwNA%3D%3D.2-ccb7-5&oh=00_AfCdPvH7c_F1gLlST-5lFl96uvucgR4tXOYNrBkCf2vWSg&oe=65F83DBE&_nc_sid=fc8dfb",
        {
            upload_preset: "postImage",
        },
    );

    console.log(resp);

    return new Response(JSON.stringify(resp), { status: 200 });
}
