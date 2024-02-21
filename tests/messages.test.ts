import {
    addMessage,
    initMessageList,
    initSmileys,
    initNewMessageForm,
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
            initNewMessageForm({
                name: 'name',
                message,
                now: Date.now(),
            }).innerHTML.includes(message)
        ).toEqual(true)
    })
    it('addMessages', () => {
        const scrollTo = jest.fn()
        Element.prototype.scrollTo = scrollTo
        document.body.innerHTML = ''
        document.body.appendChild(elemList)
        const message = 'MESSAGE'
        const date = new Date()
        date.setFullYear(2024, 1, 21)
        date.setHours(14, 45, 38)
        initMessageList([
            {
                name: 'name',
                message,
                now: date,
            },
        ])
        expect(document.body.innerHTML.includes(message)).toEqual(true)
        // сообщение добавилось именно в elemList
        expect(elemList.innerHTML.includes(`<div>MESSAGE</div>`)).toEqual(true);

        expect(scrollTo).toHaveBeenCalledTimes(1)

        // ---

        const message2 = 'MESSAGE-2'
        const date2 = new Date()
        date2.setFullYear(2024, 1, 21)
        date2.setHours(15, 8, 16)
        addMessage({
            name: 'name',
            message: message2,
            now: date2,
        })
        expect(document.body.innerHTML.includes(message2)).toEqual(true)
        // после добавления второго сообщения первое сохранилось
        expect(document.body.innerHTML.includes(message)).toEqual(true)
        expect(scrollTo).toHaveBeenCalledTimes(2)
    })
    it('viewMessages', () => {
        console.log(viewMessages().innerHTML)
        expect(viewMessages().outerHTML.startsWith('<div')).toEqual(true)
        expect(viewMessages().innerHTML.includes(`<div>MESSAGE</div>`)).toEqual(true);
        expect(viewMessages().innerHTML.includes(`<div>MESSAGE-2</div>`)).toEqual(true);
    })
})
