const PING_INTERVAL = 1000 * 60 * 3;
const PONG_TIMEOUT = 1000 * 10;
export class WebsocketController {
    private wss: WebSocket | null = null;
    private readonly url: string;
    private pongTimeout: NodeJS.Timeout | null = null;
    private pingInterval: NodeJS.Timeout | null = null;

    constructor(url: string) {
        this.url = url;
    }

    on(event: string, callback: (data: any) => void) {
        this.wss?.addEventListener("message", async (eventReceive) => {
            const data = await this.decodeMessage(eventReceive);

            if (event === "pong" && this.pongTimeout) {
                clearTimeout(this.pongTimeout);
            }

            if (data.event === event || event === "*") {
                callback(data);
            }
        });
    }

    subscribe(topic: string, event: string) {
        this.sendMessage({
            type: "subscribe",
            topic,
            event,
        });
    }

    sendPing() {
        this.sendMessage({ type: "ping" });

        this.pongTimeout = setTimeout(() => {
            this.reconnect();
        }, PONG_TIMEOUT);
    }

    sendMessage(message: any) {
        const encoder = new TextEncoder();
        const binaryData = encoder.encode(JSON.stringify(message));
        this.wss?.send(binaryData);
    }

    close() {
        this.wss?.close();
        if (this.pingInterval) clearInterval(this.pingInterval);
        if (this.pongTimeout) clearTimeout(this.pongTimeout);
    }

    reconnect() {
        this.wss?.close();
        this.connect();
    }

    connect() {
        this.wss = new WebSocket(this.url);
        this.wss.onopen = () => {
            this.pingInterval = setInterval(() => {
                this.sendPing();
            }, PING_INTERVAL);
        };

        this.on("pong", () => {});
    }

    async decodeMessage(event: MessageEvent) {
        if (event.data instanceof ArrayBuffer) {
            const decoder = new TextDecoder();
            const data = decoder.decode(event.data);
            return JSON.parse(data);
        } else if (event.data instanceof Blob) {
            const blob = event.data;
            const arrayBuffer = await blob.arrayBuffer();
            const utf8String = new TextDecoder("utf-8").decode(arrayBuffer);
            return JSON.parse(utf8String);
        }

        return null;
    }
}

const generateData = (event: string, data: any) => {};
