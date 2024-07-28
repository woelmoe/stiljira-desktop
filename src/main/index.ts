import { app, shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { setupJsonServer } from './setupJsonServer'
import 'dotenv/config'
import { registerHotkeys } from './utils/registerHotkeys'

const isDev = process.env.IS_DEV === 'true'
function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      sandbox: false,
      devTools: isDev
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (process.env.STILJIRA_URL) {
    mainWindow.loadURL(process.env.STILJIRA_URL)
    console.log('loaded from url', process.env.STILJIRA_URL)
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/dist/index.html'))
    console.log('loaded from static')
  }

  mainWindow.webContents.on('did-fail-load', () => {
    console.log('WINDOW did-fail-load ERROR OCCURRED')
    mainWindow.loadFile(join(__dirname, '../renderer/dist/index.html'))
  })
  mainWindow.webContents.on('render-process-gone', () => {
    console.log('WINDOW render-process-gone ERROR OCCURRED')
    mainWindow.loadFile(join(__dirname, '../renderer/dist/index.html'))
  })
  mainWindow.webContents.on('unresponsive', () => {
    console.log('WINDOW render-process-gone ERROR OCCURRED')
    mainWindow.loadFile(join(__dirname, '../renderer/dist/index.html'))
  })
}

app.whenReady().then(async () => {
  registerHotkeys()
  await setupJsonServer()
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
