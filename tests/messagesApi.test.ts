import {
    handlerEventSource,
    observeWithEventSource,
    sendMessage,
} from '../src/messagesApi'
import { MessageStruct, SourceData } from '../src/types'
import * as messages from '../src/messages'

describe('messagesApi', () => {
    it('sendMessage', async () => {
        window.fetch = jest.fn(() =>
            Promise.resolve({
                json() {
                    return Promise.resolve(true)
                },
            } as Response)
        )
        expect(await sendMessage({ name: '', message: '' })).toEqual(true)
    })

    it('observeWithEventSource', () => {
        const addEventListener = jest.fn(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (_event: string, _callback: (_ev: MessageEvent) => void) => {}
        )
        Object.defineProperty(window, 'EventSource', {
            writable: true,
            value: jest.fn().mockImplementation(() => ({
                close: jest.fn(() => {}),
                addEventListener,
            })),
        })
        observeWithEventSource()
        expect(addEventListener).toBeCalledTimes(1)
    })

    it('handlerEventSource', () => {
        const mockAddMessages = jest
            .spyOn(messages, 'addMessages')
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .mockImplementation((_list: MessageStruct[]) => {})
        const mockAddMessage = jest
            .spyOn(messages, 'addMessage')
            .mockImplementation(() => {})

        const v1 = JSON.stringify({
            path: '/',
            data: {
                key: { name: 'name', message: 'message', now: Date.now() },
            },
        } as SourceData)
        handlerEventSource({ data: v1 } as MessageEvent)
        expect(mockAddMessages).toBeCalledTimes(1)

        const v2 = JSON.stringify({
            path: '/00',
            data: { name: 'name', message: 'message', now: Date.now() },
        } as SourceData)
        handlerEventSource({ data: v2 } as MessageEvent)
        expect(mockAddMessage).toBeCalledTimes(1)
    })
})
