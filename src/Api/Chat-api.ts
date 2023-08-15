let subscribers = {
    'messageReceived': [] as MessagesReceivedSubscriberType[]
}

let ws: WebSocket | null =null


const closeWsHandler = () => {
    setTimeout(createChannel, 3000)
}

let messageWSHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data);
    subscribers['messageReceived'].forEach(s => s(newMessages))
}

const cleanUp = () => {
    ws?.removeEventListener('close', closeWsHandler)
    ws?.removeEventListener('message', messageWSHandler)
}

function createChannel() {
    cleanUp()
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
        subscribers['messageReceived']=[];
        cleanUp()
        ws?.close()
    },
    subscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }

}

//types
export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}
type MessagesReceivedSubscriberType = (messages: ChatMessageType[]) => void
type EventsNamesType = 'messageReceived'
