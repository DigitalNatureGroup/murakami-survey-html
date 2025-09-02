// サーベイ管理クラス
import { GASSender } from './gas-sender.js';

export class SurveyManager {
    constructor() {
        this.currentSet = null;
        this.currentSurveyIndex = 0;
        this.results = {};
        this.userInfo = {};
        this.gasSender = new GASSender();
    }

    // URLパラメータからユーザー情報を取得
    parseUserInfo() {
        const urlParams = new URLSearchParams(window.location.search);
        const uid = urlParams.get('uid');
        const task_state = urlParams.get('task_state');
        const method = urlParams.get('method');
        const group = urlParams.get('group');

        if (!uid || !task_state || !method || !group) {
            throw new Error('必要なパラメータが不足しています');
        }

        // groupの検証（"mario" または "design"）
        const allowedGroups = ['mario', 'design'];
        if (!allowedGroups.includes(group)) {
            throw new Error('無効なgroupです（mario または design を指定）');
        }

        // 条件に基づいてセットを決定
        let setKey;
        if (task_state === 'interval') {
            setKey = 'set1';
        } else if (task_state === 'complete') {
            setKey = 'set2';
        } else {
            throw new Error('無効な条件です');
        }

        this.userInfo = {
            uid: uid,
            task_state: task_state,
            method: method,
            setKey: setKey,
            group: group
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
        return await this.gasSender.submitData(data); // ← リトライ/履歴/フォールバック込み
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
