import { Todo } from '../../@types/todo.type'
import styles from './taskList.module.scss'

interface TaskListProps {
  doneTaskList?: boolean
  todoList: Todo[]
  handleDoneTodo: (id: string, done: boolean) => void
}

export default function TaskList(props: TaskListProps) {
  const { doneTaskList, todoList, handleDoneTodo } = props

  return (
    <div className='mb-2'>
      <h2 className={styles.title}>{doneTaskList ? 'Hoàn thành' : 'Chưa hoàn thành'}</h2>
      <div className={styles.tasks}>
        {todoList.map((todo) => (
          <div className={styles.task} key={todo.id}>
            <input
              type='checkbox'
              className={styles.taskCheckbox}
              checked={todo.done}
              onChange={(e) => handleDoneTodo(todo.id, e.target.checked)}
            />
            <span className={`${styles.taskName} ${todo.done ? styles.taskNameDone : ''} `}>{todo.name}</span>
            <div className={styles.taskActions}>
              <button className={styles.taskBtn}>🖋️</button>
              <button className={styles.taskBtn}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
