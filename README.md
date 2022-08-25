# 簡易純棋網站

我深信**純棋**是拯救**圍棋**的其中一支箭，因此有了這個專案。

以懂`純棋規則`的人數能在台灣超越五子棋為短期目標。

`推廣純棋，救救圍棋`

[In English](./docs/README-ENG.md)

## 什麼是純棋？

非常類似圍棋的遊戲，由日本圍棋棋士[王銘琬九段](https://zh.wikipedia.org/wiki/%E7%8E%8B%E9%8A%98%E7%90%AC)所創。

### 核心規則

1. 黑白輪流下在棋盤交叉點
2. 包圍提取
3. 子多為勝：棋盤上棋子多的一方獲勝
4. 停手計分

### 進階規則

唯一的進階規則：[打劫](https://youtu.be/3dMT9kaHYaU)

## 如何在 Local 啟用

> 感謝 [@CGLemon](https://github.com/CGLemon)

1. 使用 VSCode extension [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. 使用 `npm` package `http-server`

    > 需要下載 nodejs

    ```
    cd jungo-web
    npx http-server .
    ```
    
    之後用瀏覽器打開 `http://127.0.0.1:8080` (預設路徑)

若想使用 `python` 請參照這篇：https://stackoverflow.com/a/21608670/18536885


## Used Libraries

+ [wgo.js](https://github.com/waltheri/wgo.js) Go library
+ [Howler.js](https://howlerjs.com/) 用於聲音
+ [Bootstrap v4.5](https://getbootstrap.com/docs/4.5/getting-started/introduction/)

## About JS files

+ `board.js`: 產生棋盤與座標
+ `jungo.js`: For all events

## References

+ [王銘琬：用純棋，10分鐘學會圍棋](https://youtu.be/kJyPoZ6Xmsw)
+ [關於純棋](https://letsjungo.sinkirou.com/)

## 未完成

+ 提子音效
+ 多語言格式 (i18n)
+ chatroom
+ Web worker
