// GAS送信クラス（設定・状態管理を内包）
const GAS_CONFIG = {
    TIMEOUT: 60000,
    RETRY_COUNT: 1
};

class GASSubmissionManager {
    constructor() {
        this.isSubmitting = false;
        this.submissionHistory = [];
    }

    getSubmissionStatus() {
        return {
            isSubmitting: this.isSubmitting,
            history: this.submissionHistory
        };
    }

    addToHistory(entry) {
        this.submissionHistory.push({
            ...entry,
            timestamp: new Date().toISOString()
        });
    }
}

export class GASSender {
    constructor() {
        this.submissionManager = new GASSubmissionManager();
    }
    
    // データをGASに送信
    async submitData(data) {
        if (this.submissionManager.isSubmitting) {
            throw new Error('送信が既に進行中です');
        }
        
        this.submissionManager.isSubmitting = true;
        
        try {
            // データの検証
            this.validateData(data);
            
            // 送信実行
            const result = await this.sendWithRetry(data);
            
            // 成功履歴を追加
            this.submissionManager.addToHistory({
                status: 'success',
                data: data,
                result: result
            });
            
            return result;
            
        } catch (error) {
            // エラー履歴を追加
            this.submissionManager.addToHistory({
                status: 'error',
                data: data,
                error: error.message
            });
            
            throw error;
        } finally {
            this.submissionManager.isSubmitting = false;
        }
    }
    
    // データの検証
    validateData(data) {
        if (!data.userInfo || !data.results) {
            throw new Error('データ形式が不正です');
        }
        
        if (!data.userInfo.uid || !data.userInfo.task_state || !data.userInfo.method || !data.userInfo.group) {
            throw new Error('ユーザー情報が不完全です');
        }
        
        if (Object.keys(data.results).length === 0) {
            throw new Error('結果データが空です');
        }
    }
    
    // リトライ付き送信
    async sendWithRetry(data) {
        let lastError;
        
        for (let attempt = 1; attempt <= GAS_CONFIG.RETRY_COUNT; attempt++) {
            try {
                console.log(`GAS送信試行 ${attempt}/${GAS_CONFIG.RETRY_COUNT}`);
                
                const result = await this.sendRequest(data);
                
                console.log('GAS送信成功:', result);
                return result;
                
            } catch (error) {
                lastError = error;
                console.warn(`GAS送信失敗 (試行${attempt}):`, error);
                
                // 最後の試行でない場合は少し待ってからリトライ
                if (attempt < GAS_CONFIG.RETRY_COUNT) {
                    await this.delay(1000 * attempt); // 1秒、2秒、3秒と待機時間を増加
                }
            }
        }
        
        // 全試行失敗 → フォールバックとしてサーバーへローカル保存を依頼
        try {
            await fetch('/api/fallback-save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            console.warn('フォールバック保存を実行しました');
        } catch (fallbackError) {
            console.error('フォールバック保存も失敗:', fallbackError);
        }
        throw new Error(`送信に失敗しました (${GAS_CONFIG.RETRY_COUNT}回試行): ${lastError.message}`);
    }
    
    // 実際のHTTPリクエスト送信（サーバーサイドプロキシ方式）
    async sendRequest(data) {
        return new Promise(async (resolve, reject) => {
            try {
                // サーバーサイドプロキシを使用
                const response = await fetch('/api/submit', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        uid: data.userInfo.uid,
                        task_state: data.userInfo.task_state,
                        method: data.userInfo.method,
                        group: data.userInfo.group,
                        payload: JSON.stringify(data) // ← 文字列化して1フィールドに詰める
                    })
                });
                
                const responseText = await response.text();
                
                // HTMLレスポンスの場合は成功とみなす
                if (responseText.includes('送信完了') || responseText.includes('ありがとうございました')) {
                    resolve({ status: 'success', message: 'データが正常に送信されました' });
                } else if (responseText.includes('エラー')) {
                    reject(new Error('GAS側でエラーが発生しました'));
                } else {
                    // その他の場合は成功とみなす
                    resolve({ status: 'success', message: 'データが送信されました' });
                }
            } catch (error) {
                reject(new Error('送信に失敗しました: ' + error.message));
            }
        });
    }
    
    // 遅延関数
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // 送信状態を取得
    getSubmissionStatus() {
        return this.submissionManager.getSubmissionStatus();
    }
    
    // 送信履歴を取得
    getSubmissionHistory() {
        return this.submissionManager.submissionHistory;
    }
    
    // 送信履歴をクリア
    clearHistory() {
        this.submissionManager.submissionHistory = [];
    }
}
