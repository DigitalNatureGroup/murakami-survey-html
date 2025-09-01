# 村上サーベイシステム

複数のサーベイコンポーネントを組み合わせて表示できるWebベースのサーベイシステムです。

## 機能

- 複数のサーベイセットを動的に読み込み
- URLパラメータによる条件分岐
- Google Apps Script (GAS) を通じたGoogle Spreadsheetへのデータ保存
- サーバーサイドプロキシによるCORS回避

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env` ファイルを作成し、GASのエンドポイントURLを設定してください：

```bash
cp env.example .env
```

`.env` ファイルを編集：
```
GAS_URL=https://script.google.com/macros/s/YOUR_GAS_SCRIPT_ID/exec
PORT=3000
```

### 3. サーバーの起動

```bash
npm start
```

または開発モード：
```bash
npm run dev
```

静的ファイルのみで起動する場合：
```bash
npm run static
```

## 使用方法

### URLパラメータ

サーベイにアクセスする際は以下のURLパラメータを指定してください：

- `uid`: ユーザーID（数字）
- `condition`: 条件（"interval" または "finish"）
- `method`: 手法（"manual", "humbird", "bo", "cma"）

例：
```
http://localhost:3000/?uid=123&condition=interval&method=manual
```

### サーベイセット

現在利用可能なサーベイセット：

1. **セット1**: NASA-TLX + SUS + オリジナルサーベイ
2. **セット2**: 最終サーベイ

セットは `js/survey-config.js` で定義されています。

## ファイル構成

```
├── index.html              # メインHTMLファイル
├── server.js               # Express.jsサーバー
├── package.json            # 依存関係とスクリプト
├── .env                    # 環境変数（要作成）
├── env.example             # 環境変数テンプレート
├── js/
│   ├── main.js             # メインアプリケーション
│   ├── survey-config.js    # サーベイ設定
│   ├── survey-manager.js   # サーベイ管理
│   ├── gas-config.js       # GAS設定
│   └── gas-sender.js       # GAS送信処理
└── surveys/
    ├── nasa-tlx.js         # NASA-TLXサーベイ
    ├── sus.js              # SUSサーベイ
    ├── original.js         # オリジナルサーベイ
    ├── last-survey.js      # 最終サーベイ
    └── choice-survey.js    # 選択式サーベイ例
```

## サーベイの追加方法

### 1. 新しいサーベイファイルの作成

`surveys/` ディレクトリに新しいサーベイファイルを作成：

```javascript
// surveys/my-survey.js
export const mySurvey = {
    id: 'my-survey',
    title: 'マイサーベイ',
    questions: [
        {
            id: 'q1',
            type: 'slider',
            text: '質問1',
            min: 0,
            max: 100,
            default: 50
        },
        {
            id: 'q2',
            type: 'radio',
            text: '質問2',
            options: ['選択肢1', '選択肢2', '選択肢3']
        }
    ]
};
```

### 2. サーベイ設定への追加

`js/survey-config.js` でサーベイをインポートし、セットに追加：

```javascript
import { mySurvey } from '../surveys/my-survey.js';

export const SURVEY_SETS = {
    'set1': [nasaTlxSurvey, susSurvey, mySurvey],
    'set2': [lastSurvey]
};
```

## サポートされている質問タイプ

- **slider**: スライダー（数値入力）
- **radio**: ラジオボタン（単一選択）
- **select**: セレクトボックス（単一選択）

## GAS設定

### 1. Google Apps Scriptの作成

1. [Google Apps Script](https://script.google.com/) にアクセス
2. 新しいプロジェクトを作成
3. `gas-sample-code.gs` の内容をコピー
4. スプレッドシートIDを設定
5. デプロイしてWebアプリとして公開

### 2. フロントエンド設定

`js/gas-config.js` でGASのエンドポイントURLを設定：

```javascript
export const GAS_CONFIG = {
    ENDPOINT: "YOUR_GAS_ENDPOINT_URL",
    // ...
};
```

## アーキテクチャ

### サーバーサイドプロキシ

- **フロントエンド**: `fetch('/api/submit')` でサーバーに送信
- **サーバー**: Express.jsがGASにプロキシ転送
- **GAS**: データを受信してスプレッドシートに保存

この方式により、CORS問題を完全に回避できます。

## 開発

### ログの確認

サーバーのログで送信状況を確認できます：

```bash
npm start
```

### ヘルスチェック

サーバーの状態確認：

```
GET /api/health
```

## ライセンス

MIT License