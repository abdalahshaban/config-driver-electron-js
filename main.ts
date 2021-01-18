import { app, Tray, Menu, BrowserWindow } from 'electron';
import * as path from 'path';
const axios = require('axios')
const server = require('./app.js');

let tray: Tray = null;
let mainWindow: BrowserWindow = null;

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.quit();
} else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {

        // Someone tried to run a second instance, we should focus our window.
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore()
            mainWindow.focus()
        }
    });

    // Create win, load the rest of the app, etc...
    // app.whenReady().then(createWindow);

    app.on('ready', () => {
        app.setLoginItemSettings({
            openAtLogin: true,
            enabled: true,
        })
        createWindow()
    })
}

function createWindow() {

    mainWindow = new BrowserWindow({
        frame: false,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,  // false if you want to run 2e2 test with Spectron
            enableRemoteModule: true // true if you want to run 2e2 test  with Spectron or use remote module in renderer context (ie. Angular)
        },
    });


    mainWindow.loadURL('http://127.0.0.1:3003');
    mainWindow.hide();
    initTray();

}


function initTray() {

    tray = new Tray(path.join(__dirname, './assets/img/icon.ico'));
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'set Data in token',
            click: async () => {
                /**
                 * @desc send request to localhost to set date in token
                 */

                let setDate = await axios.post('http://127.0.0.1:3000/api/token/set-data', { pin: "11112222" })
                console.log(setDate);

            }
        },
        {
            label: 'Quit',
            type: 'normal',
            role: 'quit',
            toolTip: "will exit from app",
            click: function () {
                app.quit();
            }
        }
    ]);
    tray.setToolTip('App Name');
    tray.setContextMenu(contextMenu);

}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('will-quit', (event) => {
    console.log('will-quit');
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});




