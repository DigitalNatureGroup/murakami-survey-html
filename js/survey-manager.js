// サーベイ管理クラス
export class SurveyManager {
    constructor() {
        this.currentSet = null;
        this.currentSurveyIndex = 0;
        this.results = {};
        this.userInfo = {};
    }

    // URLパラメータからユーザー情報を取得
    parseUserInfo() {
        const urlParams = new URLSearchParams(window.location.search);
        const uid = urlParams.get('uid');
        const condition = urlParams.get('condition');
        const method = urlParams.get('method');

        if (!uid || !condition || !method) {
            throw new Error('必要なパラメータが不足しています');
        }

        // 条件に基づいてセットを決定
        let setKey;
        if (condition === 'interval') {
            setKey = 'set1';
        } else if (condition === 'finish') {
            setKey = 'set2';
        } else {
            throw new Error('無効な条件です');
        }

        this.userInfo = {
            uid: uid,
            condition: condition,
            method: method,
            setKey: setKey
        };

        return this.userInfo;
    }

    // セットを読み込み
    loadSet(setKey) {
        if (!window.SURVEY_SETS[setKey]) {
            throw new Error(`セット ${setKey} が見つかりません`);
        }

        this.currentSet = window.SURVEY_SETS[setKey];
        this.currentSurveyIndex = 0;
        this.results = {};

        return this.currentSet;
    }

    // 現在のサーベイを取得
    getCurrentSurvey() {
        if (!this.currentSet || this.currentSurveyIndex >= this.currentSet.surveys.length) {
            return null;
        }
        return this.currentSet.surveys[this.currentSurveyIndex];
    }

    // 次のサーベイに進む
    nextSurvey() {
        if (this.currentSurveyIndex < this.currentSet.surveys.length - 1) {
            this.currentSurveyIndex++;
            return true;
        }
        return false;
    }

    // 前のサーベイに戻る
    previousSurvey() {
        if (this.currentSurveyIndex > 0) {
            this.currentSurveyIndex--;
            return true;
        }
        return false;
    }

    // 結果を保存
    saveResults(surveyId, data) {
        this.results[surveyId] = data;
    }

    // 全結果を取得
    getAllResults() {
        return {
            userInfo: this.userInfo,
            results: this.results,
            timestamp: new Date().toISOString()
        };
    }

    // GASに結果を送信
    async submitToGAS() {
        const data = this.getAllResults();
        
        try {
            const response = await fetch(window.GAS_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('GAS送信エラー:', error);
            throw error;
        }
    }

    // サーベイが完了したかチェック
    isCompleted() {
        return this.currentSurveyIndex >= this.currentSet.surveys.length - 1;
    }

    // 進捗を取得
    getProgress() {
        return {
            current: this.currentSurveyIndex + 1,
            total: this.currentSet.surveys.length
        };
    }
} 
