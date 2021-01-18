"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var axios = require('axios');
var server = require('./app.js');
var tray = null;
var mainWindow = null;
var gotTheLock = electron_1.app.requestSingleInstanceLock();
if (!gotTheLock) {
    electron_1.app.quit();
}
else {
    electron_1.app.on('second-instance', function (event, commandLine, workingDirectory) {
        // Someone tried to run a second instance, we should focus our window.
        if (mainWindow) {
            if (mainWindow.isMinimized())
                mainWindow.restore();
            mainWindow.focus();
        }
    });
    // Create win, load the rest of the app, etc...
    // app.whenReady().then(createWindow);
    electron_1.app.on('ready', function () {
        electron_1.app.setLoginItemSettings({
            openAtLogin: true,
            enabled: true,
        });
        createWindow();
    });
}
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        frame: false,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            enableRemoteModule: true // true if you want to run 2e2 test  with Spectron or use remote module in renderer context (ie. Angular)
        },
    });
    mainWindow.loadURL('http://127.0.0.1:3003');
    mainWindow.hide();
    initTray();
}
function initTray() {
    var _this = this;
    tray = new electron_1.Tray(path.join(__dirname, './assets/img/icon.ico'));
    var contextMenu = electron_1.Menu.buildFromTemplate([
        {
            label: 'set Data in token',
            click: function () { return __awaiter(_this, void 0, void 0, function () {
                var setDate;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, axios.post('http://127.0.0.1:3000/api/token/set-data', { pin: "11112222" })];
                        case 1:
                            setDate = _a.sent();
                            console.log(setDate);
                            return [2 /*return*/];
                    }
                });
            }); }
        },
        {
            label: 'Quit',
            type: 'normal',
            role: 'quit',
            toolTip: "will exit from app",
            click: function () {
                electron_1.app.quit();
            }
        }
    ]);
    tray.setToolTip('App Name');
    tray.setContextMenu(contextMenu);
}
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('will-quit', function (event) {
    console.log('will-quit');
});
electron_1.app.on('activate', function () {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
