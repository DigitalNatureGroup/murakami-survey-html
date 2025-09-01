# Survey System

複数のサーベイセットを管理できるWebアプリケーションです。

## 機能

- 複数のサーベイセットの管理（セット1、セット2）
- URLパラメータによる条件分岐
- Google Apps Script (GAS) を通じたGoogle Spreadsheetへのデータ保存
- レスポンシブデザイン

## セット構成

### セット1 (condition=interval)
- NASA-TLX 作業負荷評価
- SUS システム使用性評価  
- オリジナル調査

### セット2 (condition=finish)
- 最終調査

## 使用方法

### 1. ローカルサーバーの起動

```bash
npm install
npm start
```

### 2. URLパラメータ

以下のパラメータを含むURLでアクセスしてください：

```
http://localhost:3000/?uid=123&condition=interval&method=manual
```

**パラメータ説明：**
- `uid`: 参加者ID（数字）
- `condition`: 条件（"interval" または "finish"）
- `method`: 手法（"manual", "humbird", "bo", "cma"）

### 3. GASの設定

1. Google Apps Scriptで新しいプロジェクトを作成
2. `gas-sample-code.gs`の内容をコピー
3. スプレッドシートIDを設定
4. Webアプリケーションとしてデプロイ
5. 生成されたURLを`js/survey-config.js`の`GAS_ENDPOINT`に設定

## ファイル構成

```
├── index.html          # メインHTMLファイル
├── package.json        # Node.js設定
├── js/
│   ├── survey-config.js    # セット設定（個別ファイルからインポート）
│   ├── survey-manager.js    # サーベイ管理クラス（export形式）
│   └── main.js            # メインアプリケーション（import集約）
├── surveys/            # 個別アンケートファイル
│   ├── nasa-tlx.js        # NASA-TLX アンケート
│   ├── sus.js             # SUS アンケート
│   ├── original.js        # オリジナル調査
│   ├── last-survey.js     # 最終調査
│   └── choice-survey.js   # 選択肢形式アンケート例
└── gas-sample-code.gs     # GASサンプルコード
```

## アンケートの追加・変更方法

### 新しいアンケートの追加

1. `surveys/`ディレクトリに新しいファイルを作成
2. アンケートの定義を記述
3. `js/survey-config.js`でインポートしてセットに追加

例：
```javascript
// surveys/new-survey.js
export const newSurvey = {
    id: "new-survey",
    title: "新しいアンケート",
    description: "説明文",
    questions: [
        {
            id: "question1",
            label: "質問1",
            type: "range", // range, text, radio, select
            min: 1,
            max: 5,
            defaultValue: 3,
            anchors: ["低い", "高い"]
        }
    ]
};
```

4. `js/survey-config.js`でインポートしてセットに追加：
```javascript
import { newSurvey } from '../surveys/new-survey.js';

export const SURVEY_SETS = {
    "set1": {
        name: "セット1",
        surveys: [
            nasaTlxSurvey,
            newSurvey, // 新しいアンケートを追加
            susSurvey
        ]
    }
};
```

## データ形式

送信されるデータの形式：

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