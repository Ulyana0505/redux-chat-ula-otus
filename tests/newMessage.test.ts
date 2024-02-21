import { blockAddMessage, handleAddMessage } from '../src/newMessage'
import { elemUserMessage, elemUserName } from '../src/constants'
import * as api from '../src/messagesApi'

describe('newMessage', () => {
    it('blockAddMessage', () => {
        expect(blockAddMessage().innerHTML.includes('<button')).toEqual(true)
    })
    it('handleAddMessage', () => {
        const mockSendMessage = jest
            .spyOn(api, 'sendMessage')
            .mockImplementation()
        const alert = jest.fn()
        window.alert = alert
        handleAddMessage()
        expect(alert).toHaveBeenCalledTimes(1)

        elemUserName.value = 'name'
        handleAddMessage()
        expect(alert).toHaveBeenCalledTimes(2)

        elemUserMessage.value = 'message'
        handleAddMessage()
        expect(alert).toHaveBeenCalledTimes(2)
        expect(mockSendMessage).toHaveBeenCalledTimes(1)
        expect(elemUserMessage.value).toEqual('')
    })
})
