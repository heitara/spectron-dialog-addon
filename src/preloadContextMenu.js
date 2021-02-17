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
    var menu = oldBuildFromTemplate(template);
    menu.popup = popup;
    return menu;
}
oldBuildFromTemplate = electron_1.Menu.buildFromTemplate;
electron_1.Menu.buildFromTemplate = fakeBuildFromTemplate;
electron_1.ipcMain.on('SPECTRON_DIALOG_ADDON/SET_CONTEXT_MENU_NAME', function (e, id) {
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
