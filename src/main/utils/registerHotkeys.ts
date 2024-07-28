import { app, globalShortcut, webContents } from 'electron'

function reloadWindow() {
  const focused = webContents.getFocusedWebContents()
  focused?.reload()
  console.log('reloaded')
}
export function registerHotkeys() {
  app.on('browser-window-focus', function () {
    globalShortcut.register('CommandOrControl+R', () => {
      reloadWindow()
    })
    globalShortcut.register('F5', () => {
      reloadWindow()
    })
  })
  app.on('browser-window-blur', function () {
    globalShortcut.unregister('CommandOrControl+R')
    globalShortcut.unregister('F5')
  })
}
