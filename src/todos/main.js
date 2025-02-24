import todoStore, { Filters } from "../store/todo.store"
import { CLASS, EMPTY } from "../utils/constants"
import { $, ElementSelectors } from "../utils/dom"
import { DisplayTodos } from "./use-cases/display-todos"


export const App =  () => {
  const $formTodo = $(ElementSelectors.FormTodo)
  const $todoUL = $(ElementSelectors.TodoList)
  const $filterSelect = $(ElementSelectors.FilterTodo)
  const $clearCompletedBtn = $(ElementSelectors.ClearCompletedBtn)
  const $formInputAdd = $(ElementSelectors.AddTodoInput)

  ;(() => {
    DisplayTodos()
    $formInputAdd.focus()
  })()
  
  // FILTER TODOS
  $filterSelect.addEventListener('change', (event) => {
    const filter = event.target.value.toUpperCase()
    todoStore.setFilter(filter)

    DisplayTodos(true)
  })

  // DELETE COMPLETED TODOS
  $clearCompletedBtn.addEventListener('click', () => {
    const todoCompleted = todoStore.getTodosByFilter(Filters.COMPLETED)
    let alertConfirm = null;

    if(todoCompleted.length > 0) {
      alertConfirm = window.confirm('Are you sure you want to delete all completed?')
    }
    
    if(!alertConfirm) return

    todoStore.deleteAllCompleted()
    todoStore.updateLocalStorage()
    
    DisplayTodos()
  })

  // ADD TODO
  $formTodo.addEventListener('submit', ( event ) => {
    event.preventDefault()

    const $addTodoInput = $(ElementSelectors.AddTodoInput, event.target)

    const description = $addTodoInput.value.trim()
    $addTodoInput.focus()

    if(description === EMPTY) {
      $addTodoInput.classList.add(CLASS.ERROR)
      window.setTimeout(() => {
        $addTodoInput.classList.remove(CLASS.ERROR)
      }, 2000)

      return
    }
    
     
    $addTodoInput.value = EMPTY
    todoStore.createTodo(description)
    DisplayTodos()

    todoStore.updateLocalStorage()
  })

  $todoUL.addEventListener('click', ( event ) => {
    const $todoLI = event.target.closest('.todos__item')
    if(!$todoLI) return

    $('.todos__item.active', $todoUL)?.classList.remove(CLASS.ACTIVE)

    const id = $todoLI.getAttribute('data-id')

    // DELETE TODO
    if(event.target.classList.contains('todos__delete')) {
      todoStore.deleteTodo( id )
      DisplayTodos()
      todoStore.updateLocalStorage()
    }

    // TOGGLE TODO
    if( event.target.classList.contains('todos__checkbox')  ) {
      $todoLI.classList.add(CLASS.ACTIVE)
      $('.todos__text').classList.add(CLASS.ACTIVE)
      
      todoStore.toggleTodoDone( id )
      todoStore.updateLocalStorage()

      DisplayTodos()
    }
  })

  // EDIT TODO
  $todoUL.addEventListener('dblclick', ( event ) => {
    const $todoLI = event.target.closest('.todos__item')
    if(!$todoLI) return

    const id = $todoLI.getAttribute('data-id')

    const $text = $('.todos__text', $todoLI)
    const $inputAdd = $('.todos__input-add', $todoLI)

    $inputAdd.classList.add(CLASS.SHOW)
    $inputAdd.value = $text.textContent
    $inputAdd.focus()

    $text.classList.remove(CLASS.SHOW)

    $inputAdd.addEventListener('keydown', ({key}) => {
      if(key === 'Enter' || key === 'Escape') {
        $inputAdd.blur()
      }
    })

    $inputAdd.addEventListener('blur', () => {
      $inputAdd.classList.remove(CLASS.SHOW)
      $text.textContent = $inputAdd.value
      $text.classList.add(CLASS.SHOW)

      todoStore.updateTodo(id, $inputAdd.value)
      todoStore.updateLocalStorage()
    })
  })
}