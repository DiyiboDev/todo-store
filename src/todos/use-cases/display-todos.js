import { getCurrentFilter, getTodosByFilter } from "../../store/todo.store"
import { ElementSelectors } from "../../utils/dom"
import { RenderPending } from "./render-pending"
import { RenderTodos } from "./render-todos"

/**
 * @param {boolean} isFiltering
 */
export const DisplayTodos = ( isFiltering ) => {
  const currentFilter = getCurrentFilter()
  const todos = getTodosByFilter( currentFilter )

  RenderTodos(ElementSelectors.TodoList, todos, isFiltering)
  RenderPending(ElementSelectors.PendingSpan)
}