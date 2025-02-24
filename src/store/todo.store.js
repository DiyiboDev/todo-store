import { Todo } from "../todos/models/todo.model";

export const Filters = {
  ALL: 'ALL',
  COMPLETED: 'COMPLETED',
  PENDING: 'PENDING'
}

const state = {
  todos: [],
  filter: Filters.ALL
}


// FILTERS
/**
 * @param {Filters} newFilter 
 */
export const setFilter = ( newFilter = Filters.ALL ) => {
  if(!Object.keys(Filters).includes(newFilter)) {
    throw new Error(`Filter: ${newFilter} is not valid`)
  }

  state.filter = newFilter
}
/**
 * @returns {string}
 */
export const getCurrentFilter = () => {
  return state.filter
}
/**
 * @param {Filters} filter 
 * @returns {Todo[]}
 */
export const getTodosByFilter = ( filter = Filters.ALL) => {
  switch( filter ) {
    case Filters.ALL:
      return [...state.todos]
    case Filters.COMPLETED:
      return state.todos.filter( todo => todo.done )
    case Filters.PENDING:
      return state.todos.filter( todo => !todo.done )
    default:
      throw new Error(`Option ${filter} is not valid.`)
  }
}

//  CREATE
/**
 * @param {string} description 
 */
export const createTodo = ( description ) => {
  state.todos = [
    new Todo(description),
    ...state.todos
  ]
}

// UPDATE
/**
 * @param {string} todoId 
 * @param {string} newDescription 
 */
export const updateTodo = ( todoId, newDescription ) => {
  if(!todoId) {
    throw new Error('Id es required')
  }

  state.todos = state.todos.map( todo => {
    if(todo.id === todoId) {
      todo.description = newDescription
    }

    return todo
  })
}

// DELETE
/**
 * @param {string} todoId
 */
export const deleteTodo = ( todoId ) => {
  if(!todoId) {
    throw new Error('Id is required')
  }

  state.todos = state.todos.filter( todo => todo.id !== todoId)
}
export const deleteAllCompleted = () => {
  state.todos = state.todos.filter( todo => !todo.done )
}

// TOGGLE
/**
 * @param {string} todoId 
 */
export const toggleTodoDone = ( todoId ) => {
  state.todos = state.todos.map( todo => {
    if(todo.id === todoId) {
      todo.done = !todo.done
    }
    
    return todo
  })
}

// LOCAL STORAGE
export const updateLocalStorage = () => {
  const todos = JSON.stringify(getTodosByFilter())

  localStorage.setItem('todos', todos)
}
export const getLocalStorage = () => {
  const todosStorage = localStorage.getItem('todos') ?? '[]'  
  const todos = JSON.parse(todosStorage)

  state.todos = [...todos]
}

// INIT
export const initStore = () => {
  console.log('InitStore 🥑')
  getLocalStorage()
}

export default {
  initStore,
  createTodo,
  updateTodo,
  updateLocalStorage,
  deleteTodo,
  deleteAllCompleted,
  getCurrentFilter,
  getTodosByFilter,
  setFilter,
  toggleTodoDone,
}