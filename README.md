# GAS アンケートシステム

Google Apps Script (GAS) で動作する拡張可能なアンケートシステムです。実験アプリからアンケートへの遷移と、結果のGoogle Spreadsheetへの自動保存を実現します。

## 📁 プロジェクト構造

```
📁 GAS Project
├── 📄 Code.gs (メインロジック・統合処理)
├── 📄 doGet.gs (Webアプリのエントリーポイント)
├── 📄 surveyConfig.gs (アンケート設定管理)
├── 📄 spreadsheetHandler.gs (スプレッドシート操作)
├── 📄 setup.gs (セットアップ・テスト用)
├── 📄 README.md (このファイル)
└── 📁 ui/ (HTMLテンプレート)
    ├── 📄 nasa-tlx.html (NASA-TLX専用テンプレート)
    ├── 📄 likert-scale.html (リッカート尺度専用テンプレート)
    ├── 📄 custom-survey.html (カスタムアンケート専用テンプレート)
    └── 📄 default.html (汎用デフォルトテンプレート)
```

## 🗂️ Google Spreadsheet構造

### 📄 survey_results (メイン結果シート)
| タイムスタンプ | UID | Method | Session | SurveyType | 精神的要求 | 身体的要求 | 時間的要求 | 作業成績 | 努力 | 欲求不満 | 全体的負荷 | 質問1 | 質問2 | 質問3 | 評価 | コメント |
|---------------|-----|--------|---------|------------|-----------|-----------|-----------|---------|------|---------|-----------|-------|-------|-------|------|---------|

### 📄 survey_configs (設定管理シート)
| SurveyType | Method | Template | Name | Description | Created | Updated |
|------------|--------|----------|------|-------------|---------|---------|

### 📄 statistics (統計情報シート)
| SurveyType | Method | TotalResponses | LastResponse | AverageScore | Updated |
|------------|--------|----------------|--------------|--------------|---------|

## 🚀 セットアップ手順

### 1. Google Apps Script プロジェクトの作成

1. [Google Apps Script](https://script.google.com/) にアクセス
2. 「新しいプロジェクト」をクリック
3. プロジェクト名を「アンケートシステム」などに変更

### 2. ファイルの作成

#### Code.gs
- プロジェクトのメインロジックファイル
- アンケート送信処理、テスト機能、システム情報表示

#### doGet.gs
- Webアプリのエントリーポイント
- URLパラメータ処理、テンプレート選択

#### surveyConfig.gs
- アンケート設定の管理
- フィールド定義、メソッドマッピング

#### spreadsheetHandler.gs
- スプレッドシート操作
- データ保存、統計計算、エクスポート

#### setup.gs
- セットアップとテスト用スクリプト

#### ui/ ディレクトリ
- 各アンケート専用のHTMLテンプレート
- 動的フィールド生成とGASとの連携

### 3. Google Spreadsheet の準備

1. 新しいGoogle Spreadsheetを作成
2. スプレッドシートIDをコピー（URLの `/d/` と `/edit` の間の文字列）
3. GASプロジェクトでスプレッドシートを関連付け

### 4. 初期化

1. GASエディタで `initializeSpreadsheet()` 関数を実行
2. スプレッドシートに必要なシートが作成されることを確認

### 5. Webアプリとしてデプロイ

1. 「デプロイ」→「新しいデプロイ」をクリック
2. 種類: 「ウェブアプリ」を選択
3. 次のユーザーとして実行: 「自分」を選択
4. アクセスできるユーザー: 「全員」を選択
5. 「デプロイ」をクリック
6. 生成されたURLをコピー

## 📝 使用方法

### 実験アプリからの遷移

```javascript
// 実験終了時
function finishExperiment(uid, method, session) {
  const surveyUrl = `https://script.google.com/.../exec?uid=${uid}&method=${method}&session=${session}`;
  window.location.href = surveyUrl;
}
```

### URLパラメータ

- `uid`: 参加者ID（必須）
- `method`: 実験条件（必須）
- `session`: セッションID（オプション、自動生成される）

### 使用例

```
# NASA-TLX
https://script.google.com/.../exec?uid=ABC123&method=X&session=20241201_001

# リッカート尺度
https://script.google.com/.../exec?uid=ABC123&method=Y&session=20241201_002

# カスタムアンケート
https://script.google.com/.../exec?uid=ABC123&method=Z&session=20241201_003
```

## 🎨 アンケートの追加方法

### 1. surveyConfig.gs の設定を更新

```javascript
const SURVEY_CONFIGS = {
  // 既存の設定...
  'new-survey': {
    name: '新しいアンケート',
    template: 'new-survey', // 専用テンプレート名
    fields: [
      {id: 'question1', label: '質問1', type: 'range', desc: '説明文'},
      {id: 'question2', label: '質問2', type: 'text'},
      // 他のフィールド...
    ]
  }
};

const METHOD_SURVEY_MAP = {
  // 既存のマッピング...
  'NEW': 'new-survey', // 新しいメソッドを追加
};
```

### 2. 専用テンプレートファイルを作成

`ui/new-survey.html` を作成し、独自のUIとスタイルを実装

### 3. スプレッドシートの列を更新

新しいアンケートのフィールドに対応する列を追加

## 🔧 利用可能な関数

### セットアップ・テスト
- `initializeSpreadsheet()` - スプレッドシートの初期化
- `runSystemTest()` - システム全体のテスト
- `clearTestData()` - テストデータのクリア
- `showSystemInfo()` - システム情報の表示

### データ操作
- `getSurveyResults(surveyType, method, uid)` - アンケート結果の取得
- `exportSurveyResults(surveyType, method)` - CSV形式でのエクスポート
- `calculateStatistics(surveyType, method)` - 統計データの計算

### 設定管理
- `getSurveyConfig(surveyType)` - アンケート設定の取得
- `getAvailableSurveyTypes()` - 利用可能なアンケートタイプ一覧
- `validateSurveyConfig(surveyType)` - 設定の検証

## 🎯 フィールドタイプ

### 対応しているフィールドタイプ
- `range` - スライダー（0-100）
- `text` - テキスト入力
- `textarea` - テキストエリア
- `likert` - リッカート尺度
- `rating` - 星評価（1-5）

### カスタムフィールドタイプの追加
新しいフィールドタイプを追加する場合は、対応するHTMLテンプレートでレンダリング処理を実装してください。

## 🔒 セキュリティ考慮事項

- URLパラメータの検証
- 重複送信防止
- HTTPS通信の強制
- 適切なエラーメッセージ（機密情報の漏洩防止）

## 🐛 トラブルシューティング

### よくある問題

1. **スプレッドシートが見つからない**
   - `initializeSpreadsheet()` を実行
   - スプレッドシートの権限を確認

2. **デプロイエラー**
   - ファイル名が正しいか確認
   - 構文エラーがないか確認

3. **パラメータエラー**
   - URLパラメータの形式を確認
   - 必須パラメータ（uid, method）が含まれているか確認

4. **テンプレートが見つからない**
   - `ui/` ディレクトリ内にテンプレートファイルが存在するか確認
   - ファイル名が設定と一致しているか確認

### ログ確認

GASエディタの「実行」→「実行ログ」でログを確認できます。

## 📊 データ分析

### スプレッドシート関数の例

```excel
# 特定のアンケートタイプの回答数をカウント
=COUNTIF(E:E, "nasa-tlx")

# 特定のメソッドの平均スコア
=AVERAGEIF(C:C, "X", F:F)

# 最新の回答日時
=MAX(A:A)
```

## 📚 参考文献

- 芳賀 繁・水上 洋介（1996）「日本語版 NASA-TLX によるメンタルワークロード測定」『産業・組織心理学研究』10(2)
- Hart, S. G. & Staveland, L. E. (1988) "Development of NASA-TLX (Task Load Index)"

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。