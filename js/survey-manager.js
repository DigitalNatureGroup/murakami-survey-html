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
        let finalMethod = method; // デフォルトは元のmethod

        // method の表記揺れを正規化（URLで cma などの別名が来た場合に統一）
        const methodAliases = {
            'cma': 'cma-es',
            'cmaes': 'cma-es',
            'cma_es': 'cma-es',
            'glv-bo': 'glv_bo_hybrid',
            'glvbo': 'glv_bo_hybrid',
            'standard-bo': 'bo',
            'standard_bo': 'bo'
        };
        if (Object.prototype.hasOwnProperty.call(methodAliases, finalMethod)) {
            finalMethod = methodAliases[finalMethod];
        }
        
        if (task_state === 'interval') {
            // 中間サーベイの条件分岐
            if (group === 'design') {
                // designグループの場合
                if (finalMethod === 'manual') {
                    setKey = 'set6'; // design + manual
                    console.log('design + manual');
                } else {
                    setKey = 'set4'; // design + その他の手法
                }
            } else if (group === 'mario') {
                // marioグループの場合
                if (finalMethod === 'manual') {
                    setKey = 'set3'; // mario + manual
                } else {
                    setKey = 'set1'; // mario + その他の手法
                }
            }
        } else if (task_state === 'complete') {
            // 最終サーベイの条件分岐
            if (group === 'design') {
                setKey = 'set5'; // designグループの最終サーベイ
            } else if (group === 'mario') {
                setKey = 'set2'; // marioグループの最終サーベイ
            }
            finalMethod = 'final'; // final surveyの場合はmethodを固定値に
        } else {
            throw new Error('無効な条件です');
        }

        this.userInfo = {
            uid: uid,
            task_state: task_state,
            method: finalMethod,
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
