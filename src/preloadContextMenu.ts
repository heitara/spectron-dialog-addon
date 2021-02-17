import {
    remote,
    ipcMain,
    IpcMainEvent,
    Menu,
    BrowserWindow,
    PopupOptions,
    MenuItemConstructorOptions,
    MenuItem
} from 'electron'

console.log("[PRELOAD] Starting Context Menu addon!!!")
let contextMenuDelay = 1000
let contextMenuId = ''
let oldBuildFromTemplate: any
let contextMenu: Menu
/**
 * Update the default dialog implementation function with a mock one.
 */

function popup(options?: PopupOptions): void {
    contextMenu = this
}

function fakeBuildFromTemplate(template: Array<(MenuItem)>): Menu {
    let menu = oldBuildFromTemplate(template)
    menu.popup = popup
    return menu
}
oldBuildFromTemplate = Menu.buildFromTemplate
Menu.buildFromTemplate = fakeBuildFromTemplate

/**
 * Register a SET_DIALOG_DELAY handler
 */
ipcMain.on('SPECTRON_DIALOG_ADDON/SET_CONTEXT_MENU_NAME', (e: IpcMainEvent, id: string) => {
    contextMenuId = id
    if (contextMenu) {
        let menuItem = contextMenu.getMenuItemById(id)
        menuItem.click(menuItem, BrowserWindow.getFocusedWindow(), {})
    }
})
/**
 * Register a SET_DIALOG_DELAY handler
 */
ipcMain.on('SPECTRON_DIALOG_ADDON/GET_ITEMS_COUNT', (e: IpcMainEvent) => {
    let itemsCount = 0
    if (contextMenu) {
        let items = contextMenu.items
        for (let i = 0; i < items.length; i++) {
            if (items[i].type !== 'separator' && items[i].visible) {
                itemsCount++
            }
        }
    }
    e.returnValue = itemsCount
})
