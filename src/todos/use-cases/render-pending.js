import { Filters, getTodosByFilter } from "../../store/todo.store"
import { $ } from "../../utils/dom"

let element

/**
 * @param {string} selector
 */
export const RenderPending = ( selector ) => {
  if(!element)
    element = $( selector )

  const todos = getTodosByFilter(Filters.PENDING)
  const pending = todos.length

  element.textContent = pending
}