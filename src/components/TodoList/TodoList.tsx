import { useEffect, useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'
import { Todo } from '../../@types/todo.type'

interface HandleNewTodo {
  (todos: Todo[]): Todo[]
}

const syncReactToLocal = (handleNewTodo: HandleNewTodo) => {
  const todosString = localStorage.getItem('todos')
  const todosObj: Todo[] = JSON.parse(todosString || '[]')
  const newTodosObj = handleNewTodo(todosObj)
  localStorage.setItem('todos', JSON.stringify(newTodosObj))
}

export default function TodoList() {
  const [todoList, setTodoList] = useState<Todo[]>([])
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)

  useEffect(() => {
    const todoString = localStorage.getItem('todos')
    const todosObj = JSON.parse(todoString || '[]')
    setTodoList(todosObj)
  }, [])

  const addTodo = (name: string) => {
    const handler = (todosObj: Todo[]) => {
      return [...todosObj, todo]
    }
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }
    setTodoList((prev) => [...prev, todo])
    syncReactToLocal(handler)
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

  const startEditTodo = (id: string) => {
    const findedTodo = todoList.find((todo) => todo.id === id)
    if (findedTodo) {
      setCurrentTodo(findedTodo)
    }
  }

  const editTodo = (name: string) => {
    setCurrentTodo((prev) => {
      if (prev) {
        return { ...prev, name }
      }
      return null
    })
  }

  const finishEditTodo = () => {
    const handler = (todosObj: Todo[]) => {
      return todosObj.map((todo) => {
        if (todo.id === (currentTodo as Todo).id) {
          return currentTodo as Todo
        }
        return todo
      })
    }
    setTodoList(handler)
    setCurrentTodo(null)

    // update localstorage
    syncReactToLocal(handler)
  }

  const deleteTodo = (id: string) => {
    if (currentTodo) {
      setCurrentTodo(null)
    }
    const handler = (prev: Todo[]) => {
      const findedIndexTodo = todoList.findIndex((todo) => todo.id === id)
      if (findedIndexTodo != -1) {
        const result = [...prev]
        result.splice(findedIndexTodo, 1)
        return result
      }
      return prev
    }
    setTodoList(handler)
    syncReactToLocal(handler)
  }

  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput addTodo={addTodo} currentTodo={currentTodo} editTodo={editTodo} finishEditTodo={finishEditTodo} />
        <TaskList
          todoList={todoList.filter((todo: Todo) => {
            return !todo.done
          })}
          handleDoneTodo={handleDoneTodo}
          startEditTodo={startEditTodo}
          deleteTodo={deleteTodo}
        />
        <TaskList
          todoList={todoList.filter((todo: Todo) => {
            return todo.done
          })}
          handleDoneTodo={handleDoneTodo}
          doneTaskList
          startEditTodo={startEditTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  )
}
