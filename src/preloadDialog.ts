import { MessageBoxReturnValue, ipcMain, Event, dialog, MessageBoxOptions, BrowserWindow } from 'electron'

console.log("[PRELOAD] Starting Dialog addon!!!")
let dialogDelay = 1000
let dialogButtonIndex = 1

/**
 * Update the default dialog implementation function with a mock one.
 */

function fakeShowMessageBox (browserWindow: BrowserWindow, options: MessageBoxOptions): Promise<Electron.MessageBoxReturnValue> {
	console.log("Call ShowMessageBox(browserWindow: BrowserWindow,options: MessageBoxOptions): Promise<Electron.MessageBoxReturnValue>")
    let promise = new Promise<Electron.MessageBoxReturnValue>(function(resolve, reject) {
        // the function is executed automatically when the promise is constructed
		let r:Electron.MessageBoxReturnValue = {response: dialogButtonIndex, checkboxChecked: false}
		r.response = dialogButtonIndex
        // after 1 second signal that the job is done with the result "done"
        setTimeout(() => resolve(r), dialogDelay);
    });

    return promise
}

function fakeShowMessageBox2(options: MessageBoxOptions): Promise<Electron.MessageBoxReturnValue> {
	console.log("Call ShowMessageBox(options: MessageBoxOptions): Promise<Electron.MessageBoxReturnValue>")
    let promise = new Promise<Electron.MessageBoxReturnValue>(function(resolve, reject) {
        // the function is executed automatically when the promise is constructed
		let r:Electron.MessageBoxReturnValue = {response: dialogButtonIndex, checkboxChecked: false}
		r.response = dialogButtonIndex
        // after 1 second signal that the job is done with the result "done"
        setTimeout(() => resolve(r), dialogDelay);
    });

    return promise
}

console.log('[Before]', dialog.showMessageBox)
interface ShowMessageBoxFunction {
	(options: MessageBoxOptions): Promise<Electron.MessageBoxReturnValue>;
	(browserWindow: BrowserWindow, options: MessageBoxOptions): Promise<Electron.MessageBoxReturnValue>;
  }

  const fakeShowMB:ShowMessageBoxFunction = Object.assign(function (...args: any[]) {
	console.log("Call wrapper ...")
    if (args.length == 1) {
        return fakeShowMessageBox2(args[0])
    } else {
        return fakeShowMessageBox(args[0], args[1])
    }
});

//  let full:ShowMessageBoxFunction = {fakeShowMessageBox2, fakeShowMessageBox}

// interface Foo {
//     (x: string): number,
//     (x: number): string
// }

// const foo: Foo = Object.assign(function (x: any) {
//     if (typeof x === 'string') {
//         return parseInt(x);
//     } else {
//         return x.toString();
//     }
// });

// dialog.showMessageBox[0] = fakeShowMessageBox
// let myShowMessageBoxFunction : ShowMessageBoxFunction = fakeShowMessageBox2, fakeShowMessageBox
dialog.showMessageBox = fakeShowMB

console.log('[After]', dialog.showMessageBox)

// showMessageBox(browserWindow: BrowserWindow, options: MessageBoxOptions): Promise<Electron.MessageBoxReturnValue>;

/**
 * Register a SET_DIALOG_DELAY handler
 */
ipcMain.on('SPECTRON_DIALOG_ADDON/SET_DIALOG_DELAY', (e, delay) => {
	console.log("[PRELOAD] SPECTRON_DIALOG_ADDON/SET_DIALOG_DELAY")
	dialogDelay = delay
})

/**
 * Register a SET_DIALOG_DELAY handler
 */
ipcMain.on('SPECTRON_DIALOG_ADDON/SET_DIALOG_BUTTON_INDEX', (e, index) => {
	console.log("[PRELOAD] SPECTRON_DIALOG_ADDON/SET_DIALOG_BUTTON_INDEX")
	dialogButtonIndex = index
})
