import express from 'express'
import { TaskType } from '../renderer/src/assets/interfaces/interface'
import routesTasks from './routes/routes-task'
import cors from './middleware/cors'

export interface ITask {
  id: number
  description: string
  content: string
  type: TaskType
}

export async function setupJsonServer() {
  const app = express()

  app.use(cors)
  app.use(routesTasks)

  const port = process.env.PORT || 3000

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
  })
}
