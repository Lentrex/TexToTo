// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require('electron')
const globalShortcut = ('electron').globalShortcut



// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({ width: 720, height: 350, frame: false, alwaysOnTop: true, transparent: false, resizable: true })



    // Other code removed for brevity

    var menu = Menu.buildFromTemplate([{
            label: 'Edit',
            submenu: [
                { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
                { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
                { type: 'separator' },
                { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
                { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
                { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
                { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' }
            ]
        },
        {
            label: 'Menu',
            submenu: [
                { label: 'Adjust Notification Value' },
                { label: 'CoinMarketCap' },
                {
                    label: 'Exit'


                }
            ]
        },
        {
            label: 'Help',
            submenu: [{
                label: 'View Licence',
                click: function() {
                    shell.openExternal('https://github.com/DmytroVasin/TimeTracker/blob/master/LICENSE');
                }
            }]
        },
        {
            label: 'Application',
            submenu: [{
                label: 'Quit',
                accelerator: 'Command+Q',
                click: function() {
                    app.quit() // This is a standart function to quit app.
                }
            }]
        },
        {
            label: 'View',
            submenu: [{
                    label: 'About App',
                    click: function() {
                        ipcMain.emit('show-about-window-event') // In such way we can trigger function in the main process.
                    }
                },
                {
                    label: 'Reload',
                    accelerator: 'CmdOrCtrl+R',
                    click: function(item, focusedWindow) {
                        focusedWindow.reload(); // reload the page
                    }
                }
            ]
        },
    ])


    Menu.setApplicationMenu(menu);



    // and load the index.html of the app.
    mainWindow.loadFile('index.html')

    // Open the DevTools.
    //mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

//process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';




onload = () => {
    const webview = document.querySelector('webview')
    const indicator = document.querySelector('.indicator')

    const loadstart = () => {
        indicator.innerText = 'loading...'
    }

    const loadstop = () => {
        indicator.innerText = ''
    }

    webview.addEventListener('did-start-loading', loadstart)
    webview.addEventListener('did-stop-loading', loadstop)
}





// Module to create native browser window.