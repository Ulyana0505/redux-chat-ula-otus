import styles from './newMessage.module.css'
import { elemUserMessage, elemUserName } from './constants'
import { sendMessage } from './messagesApi'
export function blockAddMessage() {
    const div = document.createElement('div')
    div.classList.add(styles.container)
    const buttonSend = document.createElement('button')
    buttonSend.textContent = 'Отправить'
    buttonSend.addEventListener('click', handleAddMessage)

    div.append(elemUserMessage, elemUserName, buttonSend)
    elemUserName.placeholder = 'Ваше имя'
    elemUserMessage.placeholder = 'Текст сообщения'
    elemUserMessage.rows = 4

    return div
}

export function handleAddMessage() {
    const userName = elemUserName.value.trim()
    const userMessage = elemUserMessage.value.trim()
    if (!userName) {
        alert('Укажите имя')
        return
    }
    if (!userMessage) {
        alert('Введите сообщение')
        return
    }

    elemUserMessage.value = ''

    sendMessage({ name: userName, message: userMessage })
}
