import * as path from 'path'
import { Application, AppConstructorOptions } from 'spectron'

/**
 * SpectronDialogAdd is a class to help test dialog items in spectron.
 */
export class SpectronDialogAddon {
  private app: Application

  /**
   * Create a new application and preload the MenuAddon bits.
   * @param options options to spectron.Application.
   */
  createApplication(options: AppConstructorOptions): Application {
    if (!options.args) {
      options.args = []
    }
    options.args.unshift(path.join(__dirname, 'preloadDialog.js'))
    options.args.unshift('--require')
    options.args.unshift(path.join(__dirname, 'preloadContextMenu.js'))
    options.args.unshift('--require')
    this.app = new Application(options)

    return this.app
  }

  /**
   * Send the delay that should be used when simulating a button click from a dialog
   * @param delay The delay in milliseconds (1000 is 1s)
   */
  async setDialogDelay(delay: number) {
    console.log('[Call]: ', 'setDialogDelay(', delay, ')')
    await this.app.electron.ipcMain.emit('SPECTRON_DIALOG_ADDON/SET_DIALOG_DELAY', delay)
  }
  /**
   * Send the button index that should be used when simulating a button click from a dialog
   * @param index The button index (e.g. 0, 1, 2, 3) If the index is invalid it will be returned.
   */
  async setDialogButtonIndex(index: number) {
    console.log('[Call]: ', 'setDialogButtonIndex(', index, ')')
    await this.app.electron["remote"]["ipcMain"].emit('SPECTRON_DIALOG_ADDON/SET_DIALOG_BUTTON_INDEX', index)
  }
  
  async emitSpectronEvent(event: string, data: Object) {
    console.log('[Call]: ', 'emitSpectronEvent(', event, data, ')')
    await this.app.electron["remote"]["ipcMain"].emit('SPECTRON_EVENT/SEND', event, {event, data})
  }
  /**
   * Send the button index that should be used when simulating a button click from a dialog
   * @param name The button index (e.g. 0, 1, 2, 3) If the index is invalid it will be returned.
   */
  async getItemsCount(): Promise<number> {
    return await this.app.electron['remote']['ipcMain'].emit('SPECTRON_DIALOG_ADDON/GET_ITEMS_COUNT')
  }

  async setContextMenuId(name: string) {
    console.log('[Call]: ', 'setContextMenuId(', name, ')')
    await this.app.electron["remote"]["ipcMain"].emit('SPECTRON_DIALOG_ADDON/SET_CONTEXT_MENU_NAME', name)
  }
}


/**
 * A singleton to export for testing.
 */
const spectronDialogAddon = new SpectronDialogAddon()
export default spectronDialogAddon
