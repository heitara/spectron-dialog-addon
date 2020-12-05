const { app, Menu, BrowserWindow, dialog } = require('electron')
const path = require('path')
const url = require('url')

let win

let agree = false
let startTime = Date()
let endTime = null


function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadURL('about:blank')

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    })
  )

  setTimeout(() => {
    //auto open a dialog
    dialog.showMessageBox({
      type: "question",
      title: "END USER LICENCE AGREEMENT (EULA) FOR SURPASS VIEWER",
      buttons: ["Disagree and Close", "Agree"],
      message: "The full text goes here "

    }).then((result) => {
      endTime = Date()
      if (result.response === 1) {
        //agree
        agree = true
      } else {
        //nothing
      }
    })
  }, 5000) //5s delay
  

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
