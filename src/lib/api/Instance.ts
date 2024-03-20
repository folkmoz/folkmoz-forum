import axios from "axios";
import { env } from "@/lib/env.mjs";
import { cookies } from "next/headers";

export const createInstance = () => {
    const cookiesMapped = cookies()
        .getAll()
        .map((c) => `${c.name}=${c.value}`);

    return axios.create({
        baseURL: env.BACKEND_URL,
        headers: {
            "Content-Type": "application/json",
            Cookie: cookiesMapped,
        },
        withCredentials: true,
    });
};
