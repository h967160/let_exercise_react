# Lets Exercise 專案介紹

想打球卻找不到朋友陪你一起打嗎？或有人有球技，卻不知道要去哪裡打球嗎？這個運動揪團網通通幫你解決這些問題！

此專案是以前後端分離開發模式進行，前端使用 React.js 作為框架，後端則是使用 Node.js Express 架設伺服器，搭配 MySQL 做資料存放。

後端專案為：[let_exercise](https://github.com/kim1037/lets_exercise)。

## Prerequisites - 開發環境

- 開發工具：Visual Studio Code v1.60.2
- 框架：React.js v5.0.1
- 專案建構工具：Create-React-App v5.0.1

## Used Packages - 使用套件

- Axios v1.6.7
- Craco v7.1.0
- React Hook Form v7.51.4
- React Router Dom v6.4.1
- Json Web Token v9.0.2
- Sweetalert2 v11.6.4
- Sass v1.76.0

## Installation and execution - 安裝與執行步驟

1. 開啟終端機（Terminal）， clone 此專案至本機電腦。

```
git clone https://github.com/h967160/let_exercise_react.git
```

2. 開啟終端機（Terminal），進入存放此專案的資料夾。

```
cd lets_exercise_react
```

3. 安裝所需套件 - 請參見 package.json

```
npm install
```

4. 啟動專案

```
npm start
```

5. 當 terminal 出現以下字樣，表示伺服器已啟動

```
You can now view let_exercise_react in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.0.12:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
```

6. 如程式未自動打開專案網頁，請輸入以下網址：

```
http://localhost:3000
```

7. 如欲停止伺服器

```
ctrl + c
```
