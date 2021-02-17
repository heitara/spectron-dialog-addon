"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpectronDialogAddon = void 0;
var tslib_1 = require("tslib");
var path = require("path");
var spectron_1 = require("spectron");
var SpectronDialogAddon = (function () {
    function SpectronDialogAddon() {
    }
    SpectronDialogAddon.prototype.createApplication = function (options) {
        if (!options.args) {
            options.args = [];
        }
        options.args.unshift(path.join(__dirname, 'preloadDialog.js'));
        options.args.unshift('--require');
        options.args.unshift(path.join(__dirname, 'preloadContextMenu.js'));
        options.args.unshift('--require');
        this.app = new spectron_1.Application(options);
        return this.app;
    };
    SpectronDialogAddon.prototype.setDialogDelay = function (delay) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('[Call]: ', 'setDialogDelay(', delay, ')');
                        return [4, this.app.electron.ipcMain.emit('SPECTRON_DIALOG_ADDON/SET_DIALOG_DELAY', delay)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    SpectronDialogAddon.prototype.setDialogButtonIndex = function (index) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('[Call]: ', 'setDialogButtonIndex(', index, ')');
                        return [4, this.app.electron["remote"]["ipcMain"].emit('SPECTRON_DIALOG_ADDON/SET_DIALOG_BUTTON_INDEX', index)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    SpectronDialogAddon.prototype.emitSpectronEvent = function (event, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('[Call]: ', 'emitSpectronEvent(', event, data, ')');
                        return [4, this.app.electron["remote"]["ipcMain"].emit('SPECTRON_EVENT/SEND', event, { event: event, data: data })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    SpectronDialogAddon.prototype.getItemsCount = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.app.electron['remote']['ipcMain'].emit('SPECTRON_DIALOG_ADDON/GET_ITEMS_COUNT')];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    SpectronDialogAddon.prototype.setContextMenuId = function (name) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('[Call]: ', 'setContextMenuId(', name, ')');
                        return [4, this.app.electron["remote"]["ipcMain"].emit('SPECTRON_DIALOG_ADDON/SET_CONTEXT_MENU_NAME', name)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return SpectronDialogAddon;
}());
exports.SpectronDialogAddon = SpectronDialogAddon;
var spectronDialogAddon = new SpectronDialogAddon();
exports.default = spectronDialogAddon;
//# sourceMappingURL=index.js.map