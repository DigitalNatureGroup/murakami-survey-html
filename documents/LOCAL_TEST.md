# ローカルテスト手順

このドキュメントでは、GASアンケートシステムをローカルでテストする方法を説明します。

## 🚀 クイックスタート

### 1. ローカルサーバーを起動

```bash
# Python を使用
npm run serve

# または http-server を使用
npm run serve:alt
```

### 2. ローカルテストページを開く

```bash
npm run test:local
```

または、ブラウザで直接アクセス：
```
http://localhost:8000/test-local.html
```

## 📋 ローカルテストの内容

### 1. URLパラメータテスト
- UID、Method、Sessionパラメータの生成
- URLの妥当性チェック
- パラメータの検証

### 2. アンケートプレビュー
- 生成されたURLでのアンケート表示
- 各アンケートタイプのUI確認

### 3. モックデータテスト
- 各アンケートタイプのデータ構造テスト
- 送信データの検証

### 4. 設定テスト
- アンケート設定の妥当性チェック
- メソッドマッピングの確認

## 🔧 GAS CLI を使用したテスト

### 1. Googleアカウントでログイン

```bash
npm run login
```

### 2. GASプロジェクトを作成（初回のみ）

```bash
npm run create
```

作成後、`.clasp.json`の`scriptId`を更新してください。

### 3. コードをGASにアップロード

```bash
npm run push
```

### 4. GASエディタを開く

```bash
npm run open
```

### 5. テスト関数を実行

```bash
# 単体テスト
npm run run:test

# システム全体テスト
npm run run:system-test

# スプレッドシート初期化
npm run run:init
```

### 6. ログを確認

```bash
npm run logs
```

### 7. Webアプリとしてデプロイ

```bash
npm run deploy
```

## 🎯 テストシナリオ

### シナリオ1: NASA-TLXアンケート
1. UID: `TEST123`, Method: `X` でURL生成
2. プレビューでアンケート表示確認
3. 各スライダーを操作してデータ送信テスト

### シナリオ2: リッカート尺度アンケート
1. UID: `TEST456`, Method: `Y` でURL生成
2. 5段階評価の選択テスト
3. 進捗バーの動作確認

### シナリオ3: カスタムアンケート
1. UID: `TEST789`, Method: `Z` でURL生成
2. 星評価の選択テスト
3. テキストエリアの入力テスト

## 🐛 トラブルシューティング

### よくある問題

1. **ローカルサーバーが起動しない**
   ```bash
   # ポート8000が使用中の場合
   npm run serve:alt -- -p 8080
   ```

2. **GAS CLIでログインエラー**
   ```bash
   # 認証をリセット
   npx clasp logout
   npm run login
   ```

3. **プッシュエラー**
   ```bash
   # 最新のコードを取得
   npm run pull
   # 再度プッシュ
   npm run push
   ```

4. **デプロイエラー**
   - GASエディタで構文エラーを確認
   - ログで詳細なエラーを確認

### デバッグ用コマンド

```bash
# システム情報を表示
npx clasp run showSystemInfo

# テストデータをクリア
npx clasp run clearTestData

# 設定を確認
npx clasp run checkConfiguration
```

## 📊 テスト結果の確認

### ローカルテスト
- ブラウザの開発者ツールでコンソールログを確認
- ネットワークタブでリクエスト/レスポンスを確認

### GASテスト
- GASエディタの「実行」→「実行ログ」でログを確認
- スプレッドシートでデータの保存を確認

## 🔄 開発ワークフロー

1. **ローカルでテスト**
   ```bash
   npm run serve
   npm run test:local
   ```

2. **コードを修正**

3. **GASにアップロード**
   ```bash
   npm run push
   ```

4. **GASでテスト**
   ```bash
   npm run run:system-test
   ```

5. **デプロイ**
   ```bash
   npm run deploy
   ```

## 📝 注意事項

- ローカルテストは完全なGAS環境を模倣するものではありません
- 実際のスプレッドシート操作はGAS環境でのみ動作します
- 本番環境でのテストを必ず行ってください
