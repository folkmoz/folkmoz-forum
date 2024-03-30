import { createContext, useEffect, useRef } from "react";
import { env } from "@/lib/env.mjs";
import { useSession } from "next-auth/react";
import { WebsocketController } from "@/lib/api/Websocket.controller";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
    const router = useRouter();

    useEffect(() => {
        if (data && !wss.current) {
            wss.current = new WebsocketController(env.NEXT_PUBLIC_WS_URL);
            wss.current.connect();

            wss.current.on("new_comment", (data) => {
                toast.info(`New comment from ${data.payload.from}`, {
                    duration: 5000,
                    actionButtonStyle: {
                        backgroundColor: "white",
                        padding: "0. 0.5rem",
                        color: "black",
                    },
                    action: {
                        label: "ดู",
                        onClick: () => {
                            router.push(`/post/${data.payload.postId}`);
                        },
                    },
                });

                router.refresh();
            });

            wss.current.on("new_action", (data) => {
                toast.info(
                    `New action: ${data.payload.action} from ${data.payload.from}`,
                    {
                        duration: 5000,
                        actionButtonStyle: {
                            backgroundColor: "white",
                            padding: "0. 0.5rem",
                            color: "black",
                        },
                        action: {
                            label: "ดู",
                            onClick: () => {
                                router.push(`/post/${data.payload.postId}`);
                            },
                        },
                    },
                );
                router.refresh();
            });
        }

        return () => {
            wss.current?.close();
            wss.current = null;
        };
    }, [data?.user]);

    return (
        <WebsocketContext.Provider value={null}>
            {children}
        </WebsocketContext.Provider>
    );
};
