import { MessageStruct } from './types'
import styles from './messages.module.css'
import { elemList } from './constants'

export function initSmileys(text: string) {
    // https://www.allsmileys.com/sweetim/sweetim-de-ita/
    return text
        .replace(
            /hi/gi,
            `<img src="https://www.allsmileys.com/files/sweetim-texticons/7060.gif" width="20" height="20" alt="hi" />`
        )
        .replace(
            /:-\)/g,
            `<img src="https://www.allsmileys.com/files/sweetim-emotions/6419.gif" width="20" height="20" alt="smile" />`
        )
}

export function viewMessage(data: MessageStruct) {
    const div = document.createElement('div')
    div.classList.add(styles.container)
    const date =
        new Date(data.now).toLocaleDateString() +
        ' ' +
        new Date(data.now).toLocaleTimeString()
    div.innerHTML =
        `<div>${initSmileys(data.message)}</div>` +
        `<div class="${styles.footer}"><div class="${styles.name}">${data.name}</div><div class="${styles.date}">${date}</div></div>`
    return div
}

export function addMessage(data: MessageStruct) {
    elemList.append(viewMessage(data))
    scrollToBottom()
}

export function addMessages(list: MessageStruct[]) {
    const frag = document.createDocumentFragment()
    for (const row of list) {
        frag.append(viewMessage(row))
    }
    elemList.append(frag)
    scrollToBottom()
}

export function scrollToBottom() {
    elemList.scrollTo({ behavior: 'smooth', top: elemList.scrollHeight })
}

export function viewMessages() {
    const div = elemList
    div.classList.add(styles.list)
    return div
}
