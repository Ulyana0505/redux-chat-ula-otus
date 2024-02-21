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
        expect(elemList.innerHTML).toEqual(
            `<div class="container"><div>MESSAGE</div><div class="footer"><div class="name">name</div><div class="date">21.02.2024 14:45:38</div></div></div>`
        )

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
        expect(viewMessages().innerHTML).toEqual(
            `<div class="container"><div>MESSAGE</div><div class="footer"><div class="name">name</div><div class="date">21.02.2024 14:45:38</div></div></div><div class="container"><div>MESSAGE-2</div><div class="footer"><div class="name">name</div><div class="date">21.02.2024 15:08:16</div></div></div>`
        )
    })
})
