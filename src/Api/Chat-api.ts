let subscribers = {
    'messageReceived': [] as MessagesReceivedSubscriberType[],
}

let ws: WebSocket | null = null

let messageWSHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data);
    subscribers['messageReceived'].forEach(s => s(newMessages))
}

const closeWsHandler = () => {
    setTimeout(createChannel, 3000)
}

let createChannel = () => {
    ws?.removeEventListener('close', closeWsHandler)
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    ws.addEventListener('close', closeWsHandler)
    ws.addEventListener('message', messageWSHandler)
}

export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        ws?.removeEventListener('close', closeWsHandler)
        ws?.removeEventListener('message', messageWSHandler)
        ws?.close()
    },
    subscribe(callback: MessagesReceivedSubscriberType) {
        // @ts-ignore
        subscribers.push(callback)
        return () => {
            // @ts-ignore
            subscribers = subscribers.filter(s => s !== callback)
        }
    },
    unsubscribe(callback: MessagesReceivedSubscriberType) {
        // @ts-ignore
        subscribers = subscribers.filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}

//types
export type ChatMessageType = {
    userId: number
    photo: string
    userName: string
    message: string
}
type MessagesReceivedSubscriberType = (messages: ChatMessageType[]) => void