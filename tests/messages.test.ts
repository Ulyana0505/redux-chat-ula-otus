import {
    addMessage,
    addMessages,
    initSmileys,
    viewMessage,
    viewMessages,
} from '../src/messages'
import { elemList } from '../src/constants'

describe('messages', () => {
    it('initSmileys', () => {
        expect(initSmileys('hi').startsWith('<img')).toEqual(true)
    })
    it('viewMessage', () => {
        const message = 'MESSAGE'
        expect(
            viewMessage({
                name: 'name',
                message,
                now: Date.now(),
            }).innerHTML.includes(message)
        ).toEqual(true)
    })
    it('viewMessages', () => {
        expect(viewMessages().outerHTML.startsWith('<div')).toEqual(true)
    })
    it('addMessages', () => {
        const scrollTo = jest.fn()
        Element.prototype.scrollTo = scrollTo
        document.body.innerHTML = ''
        document.body.appendChild(elemList)
        const message = 'MESSAGE'
        addMessages([
            {
                name: 'name',
                message,
                now: Date.now(),
            },
        ])
        expect(document.body.innerHTML.includes(message)).toEqual(true)
        expect(scrollTo).toHaveBeenCalledTimes(1)

        // ---

        const message2 = 'MESSAGE-2'
        addMessage({
            name: 'name',
            message: message2,
            now: Date.now(),
        })
        expect(document.body.innerHTML.includes(message2)).toEqual(true)
        expect(scrollTo).toHaveBeenCalledTimes(2)
    })
})
