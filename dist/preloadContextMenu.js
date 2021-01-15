"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
console.log("[PRELOAD] Starting Context Menu addon!!!");
var contextMenuDelay = 1000;
var contextMenuId = '';
var oldBuildFromTemplate;
var contextMenu;
function popup(options) {
    contextMenu = this;
}
function fakeBuildFromTemplate(template) {
    console.log('Call fakeBuildFromTemplate(template: Array<(' + JSON.stringify(template) + '): Menu');
    console.dir(template);
    var menu = oldBuildFromTemplate(template);
    menu.popup = popup;
    return menu;
}
console.log('[Before]M', electron_1.Menu.buildFromTemplate);
oldBuildFromTemplate = electron_1.Menu.buildFromTemplate;
electron_1.Menu.buildFromTemplate = fakeBuildFromTemplate;
console.log('[After]M', electron_1.Menu.buildFromTemplate);
electron_1.ipcMain.on('SPECTRON_DIALOG_ADDON/SET_CONTEXT_MENU_NAME', function (id) {
    console.log('[PRELOAD] SPECTRON_DIALOG_ADDON/SET_CONTEXT_MENU_NAME');
    contextMenuId = id;
    if (contextMenu) {
        var menuItem = contextMenu.getMenuItemById(id);
        menuItem.click(menuItem, electron_1.BrowserWindow.getFocusedWindow(), {});
    }
});
electron_1.ipcMain.on('SPECTRON_DIALOG_ADDON/GET_ITEMS_COUNT', function (e) {
    var itemsCount = 0;
    if (contextMenu) {
        var items = contextMenu.items;
        for (var i = 0; i < items.length; i++) {
            if (items[i].type !== 'separator' && items[i].visible) {
                itemsCount++;
            }
        }
    }
    e.returnValue = itemsCount;
});
