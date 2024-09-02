import { useState } from 'react'
import styles from './taskInput.module.scss'
interface TaskInputProps {
  addTodo: (name: string) => void
}

export default function TaskInput(props: TaskInputProps) {
  const { addTodo } = props

  const [name, setName] = useState<string>('')

  const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addTodo(name)
    setName('')
  }

  const onChangeSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setName(value)
  }

  return (
    <div className='mb-2'>
      <h1 className={styles.title}>To do list typescript</h1>
      <form className={styles.form} onSubmit={handleSumbit}>
        <input type='text' placeholder='caption goes here' value={name} onChange={onChangeSubmit} />
        <button type='submit'>➕</button>
      </form>
    </div>
  )
}
