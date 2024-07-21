import express, { Express } from 'express'
import path from 'node:path'
import fs from 'fs'
import { ITask } from './setupJsonServer'

const jsonBdPath = path.join(__dirname, 'db.json')
const databaseRaw = fs.readFileSync(jsonBdPath, 'utf-8')
const parsedDatabase = JSON.parse(databaseRaw)
const database: ITask[] = parsedDatabase.tasks
let lastId = parsedDatabase.lastId

export function addControllers(app: Express) {
  const jsonParser = express.json()

  app.get('/tasks', (_req, res) => {
    res.send(JSON.stringify(database))
  })

  app.post('/tasks', jsonParser, (req, res) => {
    const newTask = req.body
    lastId++
    const resultTask = {
      title: `Task-${lastId}`,
      id: lastId,
      type: newTask.type,
      content: newTask.content,
      description: newTask.description
    }
    database.push(resultTask)
    writeDataToJsonFile(database)
    res.status(201).json({
      message: 'Task created successfully!',
      task: resultTask
    })
  })

  app.post('/tasks/put', jsonParser, (req, res) => {
    const editedTask = req.body
    const foundIndex = database.findIndex((item) => item.id === editedTask.id)
    database[foundIndex] = editedTask
    writeDataToJsonFile(database)
    res.send(200)
  })

  app.post('/tasks/delete', jsonParser, (req, res) => {
    const { id } = req.body
    const foundIndex = database.findIndex((item) => item.id === id)
    database.splice(foundIndex, 1)
    writeDataToJsonFile(database)
    res.send(200)
  })
}

function writeDataToJsonFile(data: ITask[]) {
  fs.writeFileSync(jsonBdPath, JSON.stringify({ tasks: data, lastId }))
}
