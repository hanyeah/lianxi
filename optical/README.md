为了避免写大量的///\<reference path="xxxx/xxxx.ts"/>，使用typescript-box编译。

安装typescript-box。

`npm install -g typescript-box`

### VS Code设置TS SDK：

文件->首选项->设置->Typescript

`"typescript.tsdk": "C:/Users/DELL/AppData/Roaming/npm/node_modules/typescript-box/lib"`

可参考：https://blog.csdn.net/melodybai/article/details/88593069

### WebStorm设置TS SDK

File->Settings->Languages & FrameWorks->TypeScript

点击TypeScript version后面的Edit，在弹出的Configure TypeScript Complier对话框中，勾选Custom directory，浏览或填写typescript-box/lib所在路径。

### 编译命令：

`tsc-x --sortFiles --w`。