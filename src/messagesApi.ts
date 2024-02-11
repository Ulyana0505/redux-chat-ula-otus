import { MessageStruct, SourceData, SourceList } from './types'
import { addMessage, addMessages } from './messages'

const config = {
    firebaseBaseUrl: 'https://otus-js-chat-4ed79-default-rtdb.firebaseio.com',
    firebaseCollection: 'messages.json',
}

/*
export async function getMessagesList() {
  return fetch(`${config.firebaseBaseUrl}/${config.firebaseCollection}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data: Record<string, MessageSource>) =>
      Object.values(data).filter(
        ({ name, message, now }) =>
          !!name && !!message && !!now && !isNaN(new Date(now).getTime())
      )
    );
}

export function observeWithXHR(cb: (data: MessageStruct) => void) {
  // https://firebase.google.com/docs/reference/rest/database#section-streaming
  const xhr = new XMLHttpRequest();
  let lastResponseLength = 0;

  xhr.addEventListener("progress", () => {
    // console.log("xhr body", xhr.response);
    const body = xhr.response.substr(lastResponseLength);
    lastResponseLength = xhr.response.length;

    const eventType = body.match(/event: (.+)/)[1];
    const data = JSON.parse(body.match(/data: (.+)/)[1]);

    if (eventType === "put") {
      cb(data.data);
    }
  });

  xhr.open(
    "POST",
    `${config.firebaseBaseUrl}/${config.firebaseCollection}`,
    true
  );
  xhr.setRequestHeader("Accept", "text/event-stream");

  xhr.send();
}
*/

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
        addMessages(list)
    } else {
        addMessage(source.data as MessageStruct)
    }
}
