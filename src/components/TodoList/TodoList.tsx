import { useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'
import { Todo } from '../../@types/todo.type'
export default function TodoList() {
  const [todoList, setTodoList] = useState<Todo[]>([])

  const addTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }
    setTodoList((prev) => [...prev, todo])
  }

  const handleDoneTodo = (id: string, done: boolean) => {
    setTodoList((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done }
        }
        return todo
      })
    })
  }

  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput addTodo={addTodo} />
        <TaskList
          todoList={todoList.filter((todo: Todo) => {
            return !todo.done
          })}
          handleDoneTodo={handleDoneTodo}
        />
        <TaskList
          todoList={todoList.filter((todo: Todo) => {
            return todo.done
          })}
          handleDoneTodo={handleDoneTodo}
          doneTaskList
        />
      </div>
    </div>
  )
}
