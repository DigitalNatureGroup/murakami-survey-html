// GAS設定ファイル
export const GAS_CONFIG = {
    // GASのエンドポイントURL（実際のURLに置き換えてください）
    ENDPOINT: "https://script.google.com/macros/s/AKfycbyQ3lNZD8-Qc9i748yBAH-N6OqmGdhbkLXnBYPJhM0tMQcqqI7sjJDh_KA-HgXIb91Pyw/exec",
    
    // 送信設定
    TIMEOUT: 60000, // 60秒（フォームPOSTは時間がかかる場合があるため）
    RETRY_COUNT: 3, // リトライ回数
    
    // スプレッドシート設定
    SPREADSHEET_ID: "1yAWUlasKNCL0KYXhnG1PWg8e3hepjIl_-VPhgNE2azQ",
    SHEET_NAME: "hummingbird-survey",
    
    // データ形式設定
    DATA_FORMAT: {
        // 長形式（1行1質問）
        LONG_FORMAT: true,
        // 短形式（1行1サーベイ）
        WIDE_FORMAT: false
    }
};

// 送信状態の管理
export class GASSubmissionManager {
    constructor() {
        this.isSubmitting = false;
        this.submissionHistory = [];
    }
    
    // 送信状態を取得
    getSubmissionStatus() {
        return {
            isSubmitting: this.isSubmitting,
            history: this.submissionHistory
        };
    }
    
    // 送信履歴を追加
    addToHistory(entry) {
        this.submissionHistory.push({
            ...entry,
            timestamp: new Date().toISOString()
        });
    }
}
