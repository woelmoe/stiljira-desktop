import express from 'express'
import { TaskType } from '@/assets/interfaces/interface'
import { addControllers } from './controllers'

export interface ITask {
  id: number
  description: string
  content: string
  type: TaskType
}

export async function setupJsonServer() {
  const app = express()
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    next()
  })

  const port = process.env.PORT || 3000

  addControllers(app)

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
  })
}
