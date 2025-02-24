import { Todo } from "../models/todo.model"

/**
 * @param {Todo} todo 
 * @returns {HTMLLIElement}
 */
export const CreateTodo = ( { id, description, done } = [] ) => {

  const isChecked = done ? 'active' : ''

  const html = `
    <div class="todos__container-checkbox">
      <input class="todos__checkbox" type="checkbox" ${done ? 'checked' : ''} name="" id="">
    </div>
    <div class="todos__info">
      <span class="todos__text show ${isChecked}">${description}</span>
      <input type="text" class="todos__input-add">
    </div>
    <button class="todos__delete">X</button>
  `

  const $todo = document.createElement('li')
  $todo.classList.add('todos__item')
  $todo.innerHTML = html
  $todo.setAttribute('data-id', id)

  return $todo
}