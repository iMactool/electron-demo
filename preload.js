//预加载脚本在渲染器进程加载之前加载，并有权访问两个 渲染器全局 (例如 window 和 document) 和 Node.js 环境。

const { contextBridge, ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded',()=>{
    const replaceTxt = (selector,text)=>{
        const element = document.getElementById(selector);
        if(element) element.innerText = text;
    }
    for(const dependency of ['chrome','node','electron']){
        console.log(`${dependency}-version`)
        replaceTxt(`${dependency}-version`,process.versions[dependency]);
    }
});

contextBridge.exposeInMainWorld('darkMode',{
    toggle: ()=>ipcRenderer.invoke('dark-mode:toggle'),
    system: ()=>ipcRenderer.invoke('dark-mode:system')
})