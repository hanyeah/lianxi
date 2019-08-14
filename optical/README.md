为了避免写大量的///\<reference path="xxxx/xxxx.ts"/>，使用typescript-plus编译。

安装typescript-plus。

`npm install -g typescript-plus`

### VS Code设置TS SDK：

文件->首选项->设置->Typescript

`"typescript.tsdk": "C:/Users/DELL/AppData/Roaming/npm/node_modules/typescript-plus/lib"`

可参考：https://idom.me/articles/849.html

### WebStorm设置TS SDK

File->Settings->Languages & FrameWorks->TypeScript

点击TypeScript version后面的Edit，在弹出的Configure TypeScript Complier对话框中，勾选Custom directory，浏览或填写typescript-plus/lib所在路径。
(不同版本不太一样，自行解决)

### 编译命令：

`tsc-plus --reorderFiles --w`。