import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TodoList from './Todolist'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TodoList />
  </StrictMode>,
)
