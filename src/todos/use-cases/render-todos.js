import { EMPTY } from "../../utils/constants"
import { $ } from "../../utils/dom"
import { Todo } from "../models/todo.model"
import { CreateTodo } from "./create-todo"

let $element
const $message = document.createElement('p')

/**
 * @param {string} selector 
 * @param {Todo} todos
 * @param {boolean} isFiltering
 * @param {Document|HTMLElement} context
 */
export const RenderTodos = ( selector, todos = [], isFiltering, context = document ) => {
  const isEmpty = todos.length === 0

  if($element === undefined)
    $element = $(selector, context)

  $element.innerHTML = EMPTY

  if(isEmpty) {
    const text = isFiltering ? 'No items found...' : 'Add a task...'
    $message.textContent = text
    $element.append($message)
    return
  }

  todos.forEach( todo => {
    $element.append(  CreateTodo( todo ) )
  })
}