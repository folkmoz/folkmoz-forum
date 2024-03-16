import { getUserAuth } from "@/lib/auth/utils";
import { redirect } from "next/navigation";
import { NewForumProvider } from "@/contexts/NewForum.context";
import { Toaster } from "@/components/ui/toaster";

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getUserAuth();
    if (!session?.session) redirect("/?auth=required");

    return (
        <NewForumProvider>
            {children}
            <Toaster />
        </NewForumProvider>
    );
}
