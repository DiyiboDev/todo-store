import './src/style.css'
import { App } from './src/todos/main'
import todoStore from './src/store/todo.store'

todoStore.initStore()
App()