import styles from './app.module.css'
import { viewMessages } from './messages'
import { blockAddMessage } from './newMessage'
import { observeWithEventSource } from './messagesApi'
export function app() {
    const div = document.createElement('div')
    div.classList.add(styles.app)
    div.append(viewMessages(), blockAddMessage())
    observeWithEventSource()
    return div
}
