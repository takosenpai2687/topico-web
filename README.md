# topico-web

## 技术栈

vue 3 + ts + vite + sass + tailwind

## Figma 原型图

https://www.figma.com/file/7SlOvgzQ3zPm7qJ7Nr7OuS/Topico?type=design&node-id=2%3A25&mode=design&t=hhEMPO9ncXnp1XLT-1

## Beta 版本（对应 `dev` 分支）

https://topico-dev.netlify.app/

## 线上版本（对应 `master` 分支）

https://topico-prod.netlify.app/

## 开发环境搭建

### 1. 克隆项目的 dev 分支

`git clone -b dev https://github.com/takosenpai2687/topico-web.git`

### 2. 安装依赖

- `cd topico-web`
- `npm ci`

### 3. 启动项目

- （可选）在vscode中打开：`code .`

- `npm run dev`

## 代码提交规范

0. 使用 [Github Desktop](https://desktop.github.com/)
1. 任何新功能的开发都需要先从 `master` 新建一个分支，命名为`feat-xxx`。
2. 别忘了 __publish branch__ 否则只能你本地看到。开发的时候 __确保切换到该分支进行开发__。
3. 开发完成后，将分支合并到 `dev`。在本机，或 beta 环境进行自测。
4. 自测完毕后，将分支合并到 `master`。合并成功后可以删除分支。
