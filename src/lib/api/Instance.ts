import axios from "axios";
import { cookies } from "next/headers";
import { env } from "@/lib/env.mjs";

export const createInstance = () => {
    const cookieStore = cookies().toString();

    return axios.create({
        baseURL: env.BACKEND_URL,
        headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore,
        },
        withCredentials: true,
    });
};
