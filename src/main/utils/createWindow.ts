import { BrowserWindow, shell } from 'electron'
import { join } from 'path'
import icon from '../../../resources/icon.png?asset'

const isDev = process.env.IS_DEV === 'true'

export async function createWindow() {
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
    await handleLoadUrl(process.env.STILJIRA_URL)
  } else {
    loadStatic()
  }

  mainWindow.webContents.on('did-fail-load', () => {
    console.log('WINDOW did-fail-load ERROR OCCURRED')
    loadStatic()
  })

  function loadStatic() {
    mainWindow.loadFile(join(__dirname, '../renderer/dist/index.html'))
    console.log('loaded from static')
  }

  async function handleLoadUrl(url: string) {
    await mainWindow.loadURL(url)
    const accessResult = await mainWindow.webContents.executeJavaScript(
      'window.appAccessTitle'
    )
    if (accessResult !== 'stiljira-access') {
      console.log('Access to render app denied')
      loadStatic()
      return
    }

    console.log('loaded from url', url)

    mainWindow.webContents.on('console-message', (_event, _lvl, message) => {
      if (message.includes('server connection lost')) {
        console.log('console-message:', message)
        loadStatic()
      }
    })
  }
}
