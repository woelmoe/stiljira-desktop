import express from 'express'
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask
} from '../services/services-task'

const routesTasks = express.Router()
const jsonParser = express.json()
routesTasks.use(jsonParser, (req, res, next) => {
  next()
})
routesTasks.get('/tasks', (_req, res) => {
  const data = getTasks()
  res.send(data)
})

routesTasks.post('/tasks', (req, res) => {
  const newTask = req.body
  const task = createTask(newTask)
  res.status(201).json({
    message: 'Task created successfully!',
    task
  })
})

routesTasks.post('/tasks/put', (req, res) => {
  const editedTask = req.body
  const task = updateTask(editedTask)
  res.status(200).json({ message: 'Task updated!', task })
})

routesTasks.post('/tasks/delete', (req, res) => {
  const task = req.body
  deleteTask(task)
  res.status(200).json({ message: `Task ${task.id} deleted!` })
})

export default routesTasks
