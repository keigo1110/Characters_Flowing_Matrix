# Matrix Background with Scrolling Text (Synchronized Version)

このプロジェクトは、マトリックス風の背景アニメーションと流れるテキストを複数ディスプレイで同期表示するデモです。
`Node.js`と`Socket.IO`を使用して、ブラウザ間で同期をとっています。

## 構成ファイル

- **index.html**
  ブラウザ側のマトリックス背景描画とテキストスクロールの実装。`Socket.IO`クライアントを使用し、サーバから受け取った「開始時刻」をもとにアニメーションを同期させています。

- **server.js**
  シンプルな`Socket.IO`サーバ。起動時の `Date.now()` を「開始時刻」とし、クライアントが接続してきた際に送信します。

## 動作イメージ

1. サーバ (`server.js`) を起動し、`globalStartTime`（基準時刻）を`Socket.IO`を通して各クライアントに配信。
2. クライアント側 (`index.html`) では受信した開始時刻をもとに `requestAnimationFrame` でマトリックス背景とテキストスクロールを描画。
3. それぞれのディスプレイで同じグローバル時刻を基準に描画するため、複数ディスプレイで同期がとれたスクロールが実現できます。

## ディレクトリ構成例

```
.
├── index.html
└── server.js
```

## 使い方

### 1. リポジトリのクローン

```bash
git clone https://github.com/keigo1110/Characters_Flowing_Matrix.git
cd Characters_Flowing_Matrix
```

### 2. 依存関係のインストール

本サンプルでは基本的に`Socket.IO`(サーバ側) を利用しています。
Node.js がインストールされている環境で、以下のコマンドを実行してください。

```bash
npm install socket.io
```

### 3. サーバの起動

```bash
node server.js
```

これでポート番号 `3000` で`Socket.IO`サーバが立ち上がります。
`server.js` の内容を必要に応じてカスタマイズしてください。

### 4. クライアントの設定

- **index.html** 内の `socket = io("http://100.95.187.119:3000");` を、ご自身のサーバのホスト名や IP アドレスに変更してください。（ローカルで試す場合は `http://localhost:3000` にしても可）
- 複数ディスプレイを使用する場合は、`myDisplayIndex` と `totalDisplays` の値を変更してください。
  - 例: 3枚のディスプレイがある場合は `totalDisplays = 3`、それぞれ `myDisplayIndex` を `0`, `1`, `2` にしてブラウザで開きます。

### 5. ブラウザで表示

1. `index.html` をブラウザで開いてください。
2. サーバが起動している状態であれば、`Socket.IO`を通じて「開始時刻」が受信され、アニメーションが同期します。

#### フルスクリーン

- ページロード時に自動でフルスクリーンを試みていますが、多くのブラウザではユーザー操作（クリックなど）がないとフルスクリーンが許可されません。
- ユーザーがクリックすると再度フルスクリーンをリクエストする仕組みを入れています。必要に応じてフルスクリーン動作を調整してください。

## カスタマイズポイント

1. **マトリックス文字列**
   ```js
   const matrixChars = "日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ0123456789:・.";
   ```
   好きな文字列に変更することで、マトリックス風の表示に別の文字を混ぜることもできます。

2. **フォントサイズやカラー**
   - `fontSize`, `matrixCtx.fillStyle`, `textCtx.fillStyle` などを変更。
   - テキストの影 (`shadowBlur`, `shadowColor`) やフォント (`textCtx.font`) もお好みで調整可能です。

3. **スクロール速度やテキスト内容**
   - `scrollSpeed` でテキストの流れる速度(px/秒)を変えられます。
   - `displayText` に任意のメッセージを設定可能です。スペースを十分に入れることで繰り返し感を調整できます。

4. **ポート番号**
   `server.listen(3000, ...)` の `3000` を任意のポートに変更できます。
   ただし、クライアント側の `io("http://xxx:3000")` のポート番号と揃えてください。

# Matrix-Style Background Animation with Synchronized Scrolling Text

This project is a demo that displays a matrix-style background animation and flowing text synchronized across multiple displays. It uses `Node.js` and `Socket.IO` to achieve synchronization between browsers.

## Project Structure

- **index.html**
  Implements the matrix background animation and scrolling text on the browser side. It uses the `Socket.IO` client to receive a "start time" from the server and synchronize the animation accordingly.

- **server.js**
  A simple `Socket.IO` server. It initializes a "start time" using `Date.now()` upon startup and sends it to clients when they connect.

## How It Works

1. The server (`server.js`) starts and generates a `globalStartTime`, which is distributed to all clients via `Socket.IO`.
2. The client (`index.html`) receives the start time and synchronizes the matrix background animation and scrolling text using `requestAnimationFrame`.
3. Because each display uses the same global time reference, the scrolling animation appears synchronized across multiple screens.

## Directory Structure

```
.
├── index.html
└── server.js
```

## Usage

### 1. Clone the Repository

```bash
git clone https://github.com/keigo1110/Characters_Flowing_Matrix.git
cd Characters_Flowing_Matrix
```

### 2. Install Dependencies

This project mainly uses `Socket.IO` (server-side). Ensure `Node.js` is installed, then run:

```bash
npm install socket.io
```

### 3. Start the Server

```bash
node server.js
```

The `Socket.IO` server will now be running on port `3000`. You can customize `server.js` as needed.

### 4. Configure the Client

- Update `socket = io("http://100.95.187.119:3000");` in **index.html** with your server’s hostname or IP address. If testing locally, you can use `http://localhost:3000`.
- If using multiple displays, modify `myDisplayIndex` and `totalDisplays` accordingly.
  - Example: If you have 3 displays, set `totalDisplays = 3` and assign `myDisplayIndex` as `0`, `1`, and `2` for each browser instance.

### 5. Open in Browser

1. Open `index.html` in a browser.
2. If the server is running, the client will receive the "start time" via `Socket.IO`, ensuring synchronized animation.

#### Full-Screen Mode

- The page attempts to enter full-screen mode on load, but most browsers require user interaction (click, etc.) to allow full-screen access.
- If necessary, clicking the page will trigger another full-screen request.

## Customization

1. **Matrix Characters**
   ```js
   const matrixChars = "日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ0123456789:・.";
   ```
   Modify this string to change the characters displayed in the matrix-style animation.

2. **Font Size and Color**
   - Adjust `fontSize`, `matrixCtx.fillStyle`, `textCtx.fillStyle`, etc.
   - Modify text shadow settings (`shadowBlur`, `shadowColor`) and font (`textCtx.font`).

3. **Scroll Speed and Text Content**
   - Modify `scrollSpeed` to adjust the text scrolling speed (px/sec).
   - Update `displayText` to change the scrolling message. Add spaces to adjust repetition effects.

4. **Port Number**
   Change `server.listen(3000, ...)` in `server.js` to a different port if needed. Ensure the client-side `io("http://xxx:3000")` port matches.

This project provides a simple yet effective way to synchronize animations across multiple screens. Have fun experimenting!