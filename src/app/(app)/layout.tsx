import { Toaster } from "@/components/ui/sonner";
import { PostPageProvider } from "@/contexts/PostPage.context";

export default async function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <PostPageProvider>{children}</PostPageProvider>

            <Toaster richColors />
        </>
    );
}
