import path from 'node:path'
import fs from 'fs'
import { ITask } from '../setupJsonServer'

export function initDataBase() {
  const jsonBdPath = path.join(__dirname, 'db.json')
  let databaseRaw
  try {
    databaseRaw = fs.readFileSync(jsonBdPath, 'utf-8')
  } catch (e) {
    databaseRaw = createDataBase(jsonBdPath)
  }
  if (!databaseRaw) throw new Error('Error to init database')
  const parsedDatabase = JSON.parse(databaseRaw)
  const database: ITask[] = parsedDatabase.tasks
  parsedDatabase.lastId
  return {
    database,
    lastId: parsedDatabase.lastId,
    jsonBdPath
  }
}

function createDataBase(dataBasePath: string) {
  const dataRaw = {
    lastId: 0,
    tasks: []
  }
  const data = JSON.stringify(dataRaw)
  try {
    fs.writeFileSync(dataBasePath, data)
    return data
  } catch (e) {
    console.log(e)
  }
}
