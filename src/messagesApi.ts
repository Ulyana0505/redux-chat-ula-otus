import { MessageStruct, SourceData, SourceList } from './types'
import { addMessage, initMessageList } from './messages'

const config = {
    firebaseBaseUrl: 'https://otus-js-chat-4ed79-default-rtdb.firebaseio.com',
    firebaseCollection: 'messages.json',
}

export async function sendMessage(
    data: Omit<MessageStruct, 'now'>
): Promise<boolean> {
    return fetch(`${config.firebaseBaseUrl}/${config.firebaseCollection}`, {
        method: 'POST',
        body: JSON.stringify({
            ...data,
            now: new Date().getTime(),
        }),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((response) => response.json())
}

export function observeWithEventSource() {
    // https://developer.mozilla.org/en-US/docs/Web/API/EventSource/EventSource
    const evtSource = new EventSource(
        `${config.firebaseBaseUrl}/${config.firebaseCollection}`
    )

    evtSource.addEventListener('put', handlerEventSource)
}

export function handlerEventSource(ev: MessageEvent) {
    const source = JSON.parse(ev.data) as SourceData
    if (source.path === '/') {
        const list = Object.values(source.data as SourceList).filter(
            ({ name, message, now }) =>
                !!name && !!message && !!now && !isNaN(new Date(now).getTime())
        )
        initMessageList(list)
    } else {
        addMessage(source.data as MessageStruct)
    }
}
