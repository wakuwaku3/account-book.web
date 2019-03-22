const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('.mock/db.json');
const middlewares = jsonServer.defaults();

// routes.jsonの内容をここに記載
server.use(jsonServer.rewriter({}));

// ミドルウェアの設定 (コンソール出力するロガーやキャッシュの設定など)
server.use(middlewares);

server.use(function(req, res, next) {
  if (req.method !== 'GET') {
    // POST送信を受ける場合、受けたPOST レスポンスをGETに変更する
    req.method = 'GET';
    // req.query = req.body;
  }
  // Continue to JSON Server router
  next();
});

// db.json を基にデフォルトのルーティングを設定する
server.use(router);
// サーバをポート 3001 で起動する
server.listen(3001, () => {
  console.log('JSON Server is running');
});
