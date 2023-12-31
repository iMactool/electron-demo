README.md

最快捷的打包方式是使用 Electron Forge。

```
yarn add --dev @electron-forge/cli
npx electron-forge import
```

使用 Forge 的 make 命令来创建可分发的应用程序：

```
yarn make
```

通过检查 Node.js 的 process.platform 变量，您可以针对特定平台运行特定代码。 请注意，Electron 目前只支持三个平台：win32 (Windows), linux (Linux) 和 darwin (macOS) 。

### 使用 VS Code 调试

如果您希望使用 VS Code 调试您的程序，您需要让 VS Code 监听主进程 (main process) 和渲染器进程 (renderer process) 。 下面为您提供了一个简单的配置文件。 请在根目录新建一个 .vscode 文件夹，然后在其中新建一个 launch.json 配置文件并填写如下内容。

`.vscode/launch.json` 文件内容

```
{
  "version": "0.2.0",
  "compounds": [
    {
      "name": "Main + renderer",
      "configurations": ["Main", "Renderer"],
      "stopAll": true
    }
  ],
  "configurations": [
    {
      "name": "Renderer",
      "port": 9222,
      "request": "attach",
      "type": "chrome",
      "webRoot": "${workspaceFolder}"
    },
    {
      "name": "Main",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron",
      "windows": {
        "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron.cmd"
      },
      "args": [".", "--remote-debugging-port=9222"],
      "outputCapture": "std",
      "console": "integratedTerminal"
    }
  ]
}

```