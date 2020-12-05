"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
console.log("[PRELOAD] Starting Dialog addon!!!");
var dialogDelay = 1000;
var dialogButtonIndex = 1;
function fakeShowMessageBox(browserWindow, options) {
    console.log("Call ShowMessageBox(browserWindow: BrowserWindow,options: MessageBoxOptions): Promise<Electron.MessageBoxReturnValue>");
    var promise = new Promise(function (resolve, reject) {
        var r = { response: dialogButtonIndex, checkboxChecked: false };
        r.response = dialogButtonIndex;
        setTimeout(function () { return resolve(r); }, dialogDelay);
    });
    return promise;
}
function fakeShowMessageBox2(options) {
    console.log("Call ShowMessageBox(options: MessageBoxOptions): Promise<Electron.MessageBoxReturnValue>");
    var promise = new Promise(function (resolve, reject) {
        var r = { response: dialogButtonIndex, checkboxChecked: false };
        r.response = dialogButtonIndex;
        setTimeout(function () { return resolve(r); }, dialogDelay);
    });
    return promise;
}
console.log('[Before]', electron_1.dialog.showMessageBox);
var fakeShowMB = Object.assign(function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    console.log("Call wrapper ...");
    if (args.length == 1) {
        return fakeShowMessageBox2(args[0]);
    }
    else {
        return fakeShowMessageBox(args[0], args[1]);
    }
});
electron_1.dialog.showMessageBox = fakeShowMB;
console.log('[After]', electron_1.dialog.showMessageBox);
electron_1.ipcMain.on('SPECTRON_DIALOG_ADDON/SET_DIALOG_DELAY', function (e, delay) {
    console.log("[PRELOAD] SPECTRON_DIALOG_ADDON/SET_DIALOG_DELAY");
    dialogDelay = delay;
});
electron_1.ipcMain.on('SPECTRON_DIALOG_ADDON/SET_DIALOG_BUTTON_INDEX', function (e, index) {
    console.log("[PRELOAD] SPECTRON_DIALOG_ADDON/SET_DIALOG_BUTTON_INDEX");
    dialogButtonIndex = index;
});
