const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            let validChannels = [
                                "pass_html",
                                "mensaje_toMain",
                                "ask_path_toMain",
                                "ask_save_toMain",
                                "ask_confirmation_toMain"
                                ];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            };
        },
        receive: (channel, func) => {
            let validChannels = ["ans_pass_html",
                                "ans_ask_path",
                                "ans_save_path",
                                "ans_confirmation_fromMain"
                                ];
            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            };
        },
    }
);