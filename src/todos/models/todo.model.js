import { v4 as uuid } from 'uuid'

export class Todo {
  /**
   * @param {String} description Descripcion of the new todo
   */
  constructor(description) {
    this.id = uuid(),
    this.description = description
    this.done = false
    this.createAt = new Date()
  }
}