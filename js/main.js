console.log('ACTIVE main.js @', new Date().toISOString());
// すべてのインポートを集約
import { SurveyManager } from './survey-manager.js';
import { SURVEY_SETS, GAS_ENDPOINT } from './survey-config.js';

// グローバル変数として設定（他のモジュールから参照可能にするため）
window.SURVEY_SETS = SURVEY_SETS;
window.GAS_ENDPOINT = GAS_ENDPOINT;

console.log('main.js: すべてのインポート完了');

// メインアプリケーション
export class SurveyApp {
    constructor() {
        this.surveyManager = new SurveyManager();
        this.init();
    }

    async init() {
        try {
            console.log('SurveyApp: 初期化開始');
            
            // URLパラメータを解析
            const userInfo = this.surveyManager.parseUserInfo();
            console.log('SurveyApp: ユーザー情報解析完了', userInfo);
            
            // ユーザー情報を表示
            this.displayUserInfo(userInfo);
            
            // セットを読み込み
            const set = this.surveyManager.loadSet(userInfo.setKey);
            console.log('SurveyApp: セット読み込み完了', set);
            
            // 最初のサーベイを表示
            this.displayCurrentSurvey();
            
            // ボタンイベントを設定
            this.setupEventListeners();
            
        } catch (error) {
            console.error('SurveyApp: エラー発生', error);
            this.showError(error.message);
        }
    }

    // ユーザー情報を表示
    displayUserInfo(userInfo) {
        document.getElementById('uid-display').textContent = userInfo.uid;
        document.getElementById('condition-display').textContent = userInfo.condition;
        document.getElementById('method-display').textContent = userInfo.method;
    }

    // 現在のサーベイを表示
    displayCurrentSurvey() {
        const survey = this.surveyManager.getCurrentSurvey();
        if (!survey) {
            this.showError('サーベイが見つかりません');
            return;
        }

        const container = document.getElementById('survey-container');
        const progress = this.surveyManager.getProgress();

        let html = `
            <div class="survey-item">
                <div class="survey-title">
                    ${survey.title} (${progress.current}/${progress.total})
                </div>
                <p>${survey.description}</p>
                <form id="survey-form">
        `;

        survey.questions.forEach(question => {
            html += this.createQuestionHTML(question);
        });

        html += '</form></div>';

        container.innerHTML = html;

        // ボタンの表示/非表示を制御
        this.updateButtonVisibility();
    }

    // 質問のHTMLを生成
    createQuestionHTML(question) {
        let html = `
            <div class="form-group">
                <label for="${question.id}">${question.label}</label>
        `;

        if (question.description) {
            html += `<div class="description">${question.description}</div>`;
        }

        if (question.type === 'range') {
            html += `
                <input type="range" 
                       id="${question.id}" 
                       name="${question.id}" 
                       min="${question.min}" 
                       max="${question.max}" 
                       value="${question.defaultValue}"
                       ${question.required ? 'required' : ''}>
                <div class="range-labels">
                    <span>${question.anchors[0]}</span>
                    <span>${question.anchors[1]}</span>
                </div>
            `;
        } else if (question.type === 'text') {
            html += `
                <textarea id="${question.id}" 
                          name="${question.id}" 
                          placeholder="${question.placeholder || ''}"
                          rows="4" 
                          style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;"
                          ${question.required ? 'required' : ''}></textarea>
            `;
        } else if (question.type === 'radio') {
            question.options.forEach(option => {
                html += `
                    <div style="margin: 8px 0;">
                        <input type="radio" 
                               id="${question.id}_${option.value}" 
                               name="${question.id}" 
                               value="${option.value}"
                               ${question.required ? 'required' : ''}>
                        <label for="${question.id}_${option.value}" style="font-weight: normal; margin-left: 8px;">
                            ${option.label}
                        </label>
                    </div>
                `;
            });
        } else if (question.type === 'select') {
            html += `<select id="${question.id}" name="${question.id}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">`;
            question.options.forEach(option => {
                const selected = option.value === question.defaultValue ? 'selected' : '';
                html += `<option value="${option.value}" ${selected}>${option.label}</option>`;
            });
            html += '</select>';
        }

        html += '</div>';
        return html;
    }

    // ボタンの表示/非表示を制御
    updateButtonVisibility() {
        const backBtn = document.getElementById('back-btn');
        const submitBtn = document.getElementById('submit-btn');
        const resetBtn = document.getElementById('reset-btn');
        const progress = this.surveyManager.getProgress();

        // 戻るボタン: 最初のサーベイ以外で表示
        if (progress.current > 1) {
            backBtn.style.display = 'inline-block';
        } else {
            backBtn.style.display = 'none';
        }

        // 次へ/送信ボタン: 常に表示
        if (progress.current === progress.total) {
            submitBtn.style.display = 'inline-block';
            submitBtn.textContent = '結果を送信';
        } else {
            submitBtn.style.display = 'inline-block';
            submitBtn.textContent = '次へ';
        }

        // リセットボタン: 常に表示
        resetBtn.style.display = 'inline-block';
    }

    // イベントリスナーを設定
    setupEventListeners() {
        document.getElementById('back-btn').addEventListener('click', (e) => {
            e.preventDefault();
            this.handleBack();
        });

        document.getElementById('submit-btn').addEventListener('click', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        document.getElementById('reset-btn').addEventListener('click', (e) => {
            e.preventDefault();
            this.handleReset();
        });
    }

    // 送信処理
    async handleSubmit() {
        try {
            // 現在のサーベイの結果を収集
            const survey = this.surveyManager.getCurrentSurvey();
            const formData = this.collectFormData();
            
            // 結果を保存
            this.surveyManager.saveResults(survey.id, formData);

            const progress = this.surveyManager.getProgress();
            
            if (progress.current === progress.total) {
                // 最後のサーベイの場合、GASに送信
                await this.submitToGAS();
            } else {
                // 次のサーベイに進む
                this.surveyManager.nextSurvey();
                this.displayCurrentSurvey();
            }
        } catch (error) {
            this.showError(error.message);
        }
    }

    // フォームデータを収集
    collectFormData() {
        const form = document.getElementById('survey-form');
        const formData = new FormData(form);
        const data = {};

        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        return data;
    }

    // GASに送信
    async submitToGAS() {
        try {
            // 送信ボタンを無効化
            const submitBtn = document.getElementById('submit-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = '送信中...';

            // GASに送信
            await this.surveyManager.submitToGAS();

            // 成功メッセージを表示
            this.showSuccess('結果が正常に送信されました。ご協力ありがとうございました。');

            // ボタンを非表示
            submitBtn.style.display = 'none';
            document.getElementById('reset-btn').style.display = 'none';

        } catch (error) {
            this.showError('送信に失敗しました: ' + error.message);
            
            // ボタンを再有効化
            const submitBtn = document.getElementById('submit-btn');
            submitBtn.disabled = false;
            submitBtn.textContent = '結果を送信';
        }
    }

    // 戻る処理
    handleBack() {
        if (confirm('前のサーベイに戻りますか？現在の入力は保存されません。')) {
            // 前のサーベイに戻る
            this.surveyManager.previousSurvey();
            this.displayCurrentSurvey();
        }
    }

    // リセット処理
    handleReset() {
        if (confirm('入力をリセットしてもよろしいですか？')) {
            const form = document.getElementById('survey-form');
            form.reset();
        }
    }

    // エラーメッセージを表示
    showError(message) {
        const container = document.getElementById('survey-container');
        container.innerHTML = `
            <div class="error">
                <strong>エラー:</strong> ${message}
            </div>
        `;
    }

    // 成功メッセージを表示
    showSuccess(message) {
        const container = document.getElementById('survey-container');
        container.innerHTML = `
            <div class="success">
                <strong>完了:</strong> ${message}
            </div>
        `;
    }
}

// アプリケーションを開始
document.addEventListener('DOMContentLoaded', () => {
    new SurveyApp();
});
