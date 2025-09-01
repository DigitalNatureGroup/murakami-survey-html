# GAS送信システム セットアップガイド

## 1. Google Apps Scriptの設定

### 1.1 GASプロジェクトの作成
1. [Google Apps Script](https://script.google.com/)にアクセス
2. 「新しいプロジェクト」をクリック
3. プロジェクト名を「Survey System」に変更

### 1.2 GASコードの配置
`gas-sample-code.gs`の内容をコピーしてGASエディタに貼り付け

### 1.3 スプレッドシートの準備
1. Google Spreadsheetを新規作成
2. スプレッドシートIDをコピー（URLの`/d/`と`/edit`の間の文字列）
3. シート名を「hummingbird-survey」に変更

### 1.4 GASコードの設定
```javascript
// gas-sample-code.gs の以下の部分を変更
const spreadsheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID'); // ← 実際のスプレッドシートID
```

### 1.5 Webアプリケーションとしてデプロイ
1. 「デプロイ」→「新しいデプロイ」をクリック
2. 「種類の選択」→「ウェブアプリ」を選択
3. 以下の設定を行う：
   - 説明: Survey System v1.0
   - 次のユーザーとして実行: 自分
   - アクセスできるユーザー: 全員
4. 「デプロイ」をクリック
5. 承認を求められたら「許可」をクリック
6. 生成されたURLをコピー

## 2. フロントエンドの設定

### 2.1 GASエンドポイントの設定
`js/gas-config.js`の以下の部分を変更：
```javascript
export const GAS_CONFIG = {
    ENDPOINT: "YOUR_GAS_ENDPOINT_URL_HERE", // ← 実際のGASのURL
    // ...
};
```

### 2.2 スプレッドシートIDの設定
```javascript
export const GAS_CONFIG = {
    // ...
    SPREADSHEET_ID: "YOUR_SPREADSHEET_ID_HERE", // ← 実際のスプレッドシートID
    // ...
};
```

## 3. 動作確認

### 3.1 テスト送信
1. アプリケーションを起動
2. サーベイを完了
3. 「結果を送信」をクリック
4. ブラウザの開発者ツールでコンソールを確認
5. スプレッドシートでデータが保存されているか確認

## 3. 動作確認

### 3.1 テスト送信
1. アプリケーションを起動
2. サーベイを完了
3. 「結果を送信」をクリック
4. ブラウザの開発者ツールでコンソールを確認
5. スプレッドシートでデータが保存されているか確認

### 3.2 エラーハンドリング
- 送信失敗時は自動的にリトライ（3回）
- タイムアウトは60秒（フォームPOST方式のため）
- エラー詳細はコンソールに表示
- CORSエラーは発生しません（フォームPOST方式）

### 3.3 送信方式
- **フォームPOST方式**: CORSエラーを回避
- **非表示iframe**: ページ遷移なしで送信
- **自動クリーンアップ**: 送信後にiframeとフォームを自動削除

## 4. データ形式

### 4.1 送信データ
```json
{
  "userInfo": {
    "uid": "123",
    "condition": "interval",
    "method": "manual",
    "setKey": "set1"
  },
  "results": {
    "nasa-tlx": {
      "mental": "50",
      "physical": "30",
      "temporal": "40"
    }
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 4.2 スプレッドシート形式
| UID | Condition | Method | Timestamp | SurveyID | QuestionID | Value |
|-----|-----------|--------|-----------|----------|------------|-------|
| 123 | interval  | manual | 2024-01-01T00:00:00.000Z | nasa-tlx | mental | 50 |

## 5. トラブルシューティング

### 5.1 よくある問題
- **CORSエラー**: GASのデプロイ設定で「全員」にアクセス許可
- **認証エラー**: GASの実行権限を「自分」に設定
- **タイムアウト**: ネットワーク環境を確認

### 5.2 デバッグ方法
- ブラウザの開発者ツールでコンソールを確認
- GASのログでエラー詳細を確認
- `showSubmissionStatus()`メソッドで送信履歴を確認
