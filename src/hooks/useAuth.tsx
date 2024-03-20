import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

export const useAuth = () => {
    const { status, data } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    const requiredAuth = (callback: () => void) => {
        if (status === "loading") return;
        if (!data) {
            router.replace(pathname + "?auth=required", {
                scroll: false,
            });
            return;
        }

        callback();
    };

    return {
        isLoggedIn: !!data,
        requiredAuth,
    };
};
