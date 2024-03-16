"use client";

import { WebsocketProvider } from "@/contexts/Websocket.context";
import NextAuthProvider from "@/lib/auth/Provider";
import { TooltipProvider } from "@/components/ui/tooltip";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <NextAuthProvider>
                <WebsocketProvider>
                    <TooltipProvider>{children}</TooltipProvider>
                </WebsocketProvider>
            </NextAuthProvider>
        </>
    );
};
