import path from 'node:path'
import fs from 'fs'
import { ITask } from '../setupJsonServer'

const jsonBdPath = path.join(__dirname, 'db.json')
const databaseRaw = fs.readFileSync(jsonBdPath, 'utf-8')
const parsedDatabase = JSON.parse(databaseRaw)
const database: ITask[] = parsedDatabase.tasks
let lastId = parsedDatabase.lastId

export function getTasks() {
  return JSON.stringify(database)
}

export function createTask(newTask: ITask) {
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
  return resultTask
}

export function updateTask(editedTask: ITask) {
  const foundIndex = database.findIndex((item) => item.id === editedTask.id)
  database[foundIndex] = editedTask
  writeDataToJsonFile(database)
  return database[foundIndex]
}

export function deleteTask(deletedTask: ITask) {
  const foundIndex = database.findIndex((item) => item.id === deletedTask.id)
  database.splice(foundIndex, 1)
  writeDataToJsonFile(database)
}

function writeDataToJsonFile(data: ITask[]) {
  fs.writeFileSync(jsonBdPath, JSON.stringify({ tasks: data, lastId }))
}
