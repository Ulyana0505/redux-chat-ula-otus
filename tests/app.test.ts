import * as messages from '../src/messages'
import * as newMessage from '../src/newMessage'
import * as api from '../src/messagesApi'

describe('app', () => {
    it('default', () => {
        const mockViewMessages = jest
            .spyOn(messages, 'viewMessages')
            .mockImplementation()

        const mockBlockAddMessage = jest
            .spyOn(newMessage, 'blockAddMessage')
            .mockImplementation()

        const mockObserveWithEventSource = jest
            .spyOn(api, 'observeWithEventSource')
            .mockImplementation()

        require('../src/index')

        expect(mockViewMessages).toHaveBeenCalledTimes(1)
        expect(mockBlockAddMessage).toHaveBeenCalledTimes(1)
        expect(mockObserveWithEventSource).toHaveBeenCalledTimes(1)
    })
})
