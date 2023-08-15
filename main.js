const {app, BrowserWindow, nativeTheme, ipcMain, nativeImage, Tray, Menu } = require('electron')
const { platform } = require('os')

//include the Node.js 'path' module at the top of your file
const path = require('path')

//添加一个createWindow()方法来将 index.html 加载进一个新的BrowserWindow实例。
const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      maxWidth:1024,
      maxHeight:970,
      webPreferences:{
        preload : path.join(__dirname,'preload.js') //预加载 脚本
      },
      icon: path.join(__dirname,'./images/facetime.png'),
      title: "FirstAPP", //默认窗口标题。默认是"Electron"。
     })
  
    if(process.platform === 'darwin'){
        app.dock.setIcon(path.join(__dirname,'images/facetime.png'));
    }

    win.loadFile('index.html') //打开文件
    // win.loadURL('https://shequ-demo.fastwhale.com.cn/'); //直接代开URL

    //打开开发工具
    // win.webContents.openDevTools();
  }

let tray
// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
  app.whenReady().then(() => {
    createWindow()

    app.on('activate',()=>{
         // 在 macOS 系统内, 如果没有已开启的应用窗口
        // 点击托盘图标时通常会重新创建一个新窗口
        if(BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    });

    const icon = nativeImage.createFromPath('./images/app.ico')
    tray = new Tray(icon)

    const contextMenu = Menu.buildFromTemplate([
        {label: 'Item1',type:'radio'},
        {label:'更新',type:'normal',checked:true},
        {label:"运行",type:"radio"}
    ])
    tray.setContextMenu(contextMenu)

    tray.setToolTip('this is my application.')
    tray.setTitle('系统托盘里看到我')

  })

  // 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态, 
// 直到用户使用 Cmd + Q 明确退出
//通常我们使用触发器的 .on 函数来监听 Node.js 事件。
  app.on('window-all-closed',()=>{
    console.log("窗口退出了！",process.platform);
    if(process.platform !== 'darwin'){
        app.quit()
    }

    console.log("我是非Windows 系统，所以你还是可以看到我，程序并没有真正的退出哦~");
  });  

  ipcMain.handle('dark-mode:toggle',()=>{
    if(nativeTheme.shouldUseDarkColors){
        nativeTheme.themeSource = 'light'
    }else{
        nativeTheme.themeSource='dark'
    }
    return nativeTheme.shouldUseDarkColors
  })

  ipcMain.handle('dark-mode:system',()=>{
    nativeTheme.themeSource='system'
  })

 