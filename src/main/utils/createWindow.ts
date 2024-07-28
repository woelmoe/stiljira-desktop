import { BrowserWindow, shell } from 'electron'
import { join } from 'path'
import icon from '../../../resources/icon.png?asset'

const isDev = process.env.IS_DEV === 'true'

export function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    icon,
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

    mainWindow.webContents.on('console-message', (_event, _lvl, message) => {
      if (message.includes('server connection lost')) {
        console.log('console-message:', message)
        mainWindow.loadFile(join(__dirname, '../renderer/dist/index.html'))
      }
    })
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/dist/index.html'))
    console.log('loaded from static')
  }

  mainWindow.webContents.on('did-fail-load', () => {
    console.log('WINDOW did-fail-load ERROR OCCURRED')
    mainWindow.loadFile(join(__dirname, '../renderer/dist/index.html'))
  })
}
