import { createContext, useEffect, useRef } from "react";
import { env } from "@/lib/env.mjs";
import { useSession } from "next-auth/react";

export const WebsocketContext = createContext(null);

const PING_INTERVAL = 30000; // 30 วินาที
const PONG_TIMEOUT = 10000; // 10 วินาที

export const WebsocketProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const wss = useRef<WebSocket | null>(null);
    const { data } = useSession();
    let pongTimeout: NodeJS.Timeout | null;

    const sendMessage = (message: string) => {
        const encoder = new TextEncoder();
        const binaryData = encoder.encode(message);
        wss.current?.send(binaryData);
    };

    const onmessage = (e: MessageEvent) => {
        if (e.data === "pong") {
            console.log("Received pong");

            if (pongTimeout) {
                clearTimeout(pongTimeout);
                pongTimeout = null;
            }
        } else {
            console.log(e.data);
        }
    };

    const reconnect = () => {
        wss.current?.close();
        const newWs = new WebSocket(env.NEXT_PUBLIC_WS_URL + "?name=folkmoz");

        newWs.onopen = () => {
            console.log("WebSocket reconnected");
            if (data?.user) {
                const message = JSON.stringify({
                    type: "subscribe",
                    topic: "app:" + data.user.id,
                    event: "connect",
                });
                sendMessage(message);
            }
        };

        newWs.onmessage = onmessage;
        newWs.onclose = () => {
            setTimeout(reconnect, 5000);
        };

        wss.current = newWs;
    };

    useEffect(() => {
        const pingInterval = setInterval(() => {
            if (wss.current && wss.current.readyState === WebSocket.OPEN) {
                wss.current.send("ping");
                console.log("Sent ping");

                pongTimeout = setTimeout(() => {
                    console.log("Pong timeout, reconnecting...");
                    reconnect();
                }, PONG_TIMEOUT);
            }
        }, PING_INTERVAL);

        return () => {
            clearInterval(pingInterval);
        };
    }, []);

    useEffect(() => {
        if (!wss.current && data?.user) {
            wss.current = new WebSocket(
                env.NEXT_PUBLIC_WS_URL + "?name=folkmoz",
            );
            wss.current.binaryType = "arraybuffer";
            wss.current.onmessage = onmessage;
        }

        return () => {
            wss.current?.close();
        };
    }, [data?.user]);

    useEffect(() => {
        if (data?.user && !wss.current) {
            const message = JSON.stringify({
                type: "subscribe",
                topic: "app:" + data.user.id,
                event: "connect",
            });
            sendMessage(message);
        }
    }, [data?.user]);

    return (
        <WebsocketContext.Provider value={null}>
            {children}
        </WebsocketContext.Provider>
    );
};
