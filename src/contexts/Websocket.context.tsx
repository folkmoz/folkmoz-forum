import { createContext, useEffect, useRef } from "react";
import { env } from "@/lib/env.mjs";
import { useSession } from "next-auth/react";
import { WebsocketController } from "@/lib/api/Websocket.controller";

export const WebsocketContext = createContext(null);

const PING_INTERVAL = 30000;
const PONG_TIMEOUT = 10000;

export const WebsocketProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const wss = useRef<WebsocketController | null>(null);
    const { data } = useSession();

    useEffect(() => {
        if (data && !wss.current) {
            wss.current = new WebsocketController(env.NEXT_PUBLIC_WS_URL);
            wss.current.connect();
        }

        return () => {
            wss.current?.close();
        };
    }, [data?.user]);

    return (
        <WebsocketContext.Provider value={null}>
            {children}
        </WebsocketContext.Provider>
    );
};
