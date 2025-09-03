console.log('ACTIVE main.js @', new Date().toISOString());
// すべてのインポートを集約
import { SurveyManager } from './survey-manager.js';
import { SURVEY_SETS, METHOD_CODE_MAP } from './survey-config.js';
import { GASSender } from './gas-sender.js';
import { LanguageManager } from './language-manager.js';

// グローバル変数として設定（他のモジュールから参照可能にするため）
window.SURVEY_SETS = SURVEY_SETS;

console.log('main.js: すべてのインポート完了');

// メインアプリケーション
export class SurveyApp {
    constructor() {
        this.surveyManager = new SurveyManager();
        this.gasSender = new GASSender();
        this.languageManager = new LanguageManager();
        this.METHOD_CODE_MAP = METHOD_CODE_MAP;
        this.init();
    }

    async init() {
        try {
            console.log('SurveyApp: 初期化開始');
            
            // URLパラメータを解析
            const userInfo = this.surveyManager.parseUserInfo();
            this.userInfo = userInfo; // ユーザー情報を保存
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
            
            // 言語変更イベントのリスナーを設定
            this.setupLanguageEventListeners();
            
        } catch (error) {
            console.error('SurveyApp: エラー発生', error);
            this.showError(error.message);
        }
    }

    // 言語変更イベントのリスナーを設定
    setupLanguageEventListeners() {
        window.addEventListener('languageChanged', () => {
            // 動的コンテンツの言語を更新
            this.languageManager.updateDynamicContent();
            
            // 現在のアンケートを再表示（言語切り替え対応）
            this.displayCurrentSurvey();
            
            // ボタンの表示/非表示を制御（言語変更後に再実行）
            this.updateButtonVisibility();
            
            // ユーザー情報の表示を更新
            if (this.userInfo) {
                this.displayUserInfo(this.userInfo);
            }
        });
    }

    // ユーザー情報を表示
    displayUserInfo(userInfo) {
        document.getElementById('uid-display').textContent = userInfo.uid;
        
        // 条件の表示を多言語対応
        const conditionText = userInfo.task_state === 'interval' 
            ? (this.languageManager.getCurrentLanguage() === 'ja' ? '途中' : 'Interval')
            : (this.languageManager.getCurrentLanguage() === 'ja' ? '完了' : 'Complete');
        document.getElementById('condition-display').textContent = conditionText;
        
        // 手法の表示を絵文字付きに変更
        const methodMap = {
            'glv_bo_hybrid': '🐬 イルカ',
            'cma-es': '🦉 フクロウ',
            'bo': '🐎 ウマ',
            'manual': '🐤 ヒヨコ'
        };
        
        const methodText = methodMap[userInfo.method] || userInfo.method;
        document.getElementById('method-display').textContent = methodText;
        
        if (userInfo.task_state === 'complete') {
            const methodEl = document.getElementById('method-display');
            if (methodEl && methodEl.parentElement) {
                // 手法の行（.info-item）のみ非表示
                methodEl.parentElement.style.display = 'none';
            }
        }
    }

    // 現在のサーベイを表示
    displayCurrentSurvey() {
        const survey = this.surveyManager.getCurrentSurvey();
        if (!survey) {
            this.showError(this.languageManager.getCurrentLanguage() === 'ja' ? 'サーベイが見つかりません' : 'Survey not found');
            return;
        }

        const container = document.getElementById('survey-container');
        const progress = this.surveyManager.getProgress();
        const currentLang = this.languageManager.getCurrentLanguage();

        let html = `
            <div class="survey-item">
                <div class="survey-title" data-ja="${survey.title}" data-en="${survey.title_en || survey.title}">
                    <span class="title-text">${currentLang === 'ja' ? survey.title : (survey.title_en || survey.title)}</span>
                    <span class="progress-info"> (${progress.current}/${progress.total})</span>
                </div>
                <p data-ja="${survey.description}" data-en="${survey.description_en || survey.description}">${currentLang === 'ja' ? survey.description : (survey.description_en || survey.description)}</p>
                <form id="survey-form">
        `;

        survey.questions.forEach(question => {
            html += this.createQuestionHTML(question);
        });

        html += '</form></div>';

        container.innerHTML = html;

        // 目盛り生成（.tlx-field ごとに data-ticks 分割で生成）
        (function renderAllTicks(){
            const fields = container.querySelectorAll('.tlx-field');
            fields.forEach(field => {
                const ticksContainer = field.querySelector('.tlx-ticks');
                if (!ticksContainer) return;
                const divisions = Number(field.getAttribute('data-ticks') || 10);
                ticksContainer.innerHTML = '';
                for (let i = 0; i <= divisions; i++) {
                    const tick = document.createElement('span');
                    tick.className = 'tick';
                    tick.appendChild(document.createTextNode(''));
                }
            });
        })();

        // ボタンの表示/非表示を制御
        this.updateButtonVisibility();
    }

    // 質問のHTMLを生成
    createQuestionHTML(question) {
        const currentLang = this.languageManager.getCurrentLanguage();
        let html = `
            <div class="form-group question-block">
        `;
        
        // ラベルの多言語対応（data属性付き）
        if (question.label) {
            const labelText = currentLang === 'ja' ? question.label : (question.label_en || question.label);
            html += `<label for="${question.id}" data-ja="${question.label}" data-en="${question.label_en || question.label}">${labelText}</label>`;
        }

        // 説明の多言語対応（data属性付き）
        if (question.description) {
            const descText = currentLang === 'ja' ? question.description : (question.description_en || question.description);
            html += `<div class="description" data-ja="${question.description}" data-en="${question.description_en || question.description}">${descText}</div>`;
        }

        if (question.type === 'range') {
            // アンカーの多言語対応
            const anchors = currentLang === 'ja' ? question.anchors : (question.anchors_en || question.anchors);
            html += `
                <div class="tlx-field" data-ticks="10">
                    <input id="${question.id}" name="${question.id}" class="tlx-range" type="range" min="${question.min}" max="${question.max}" step="1" value="${question.defaultValue}" ${question.required ? 'required' : ''}>
                    <div class="tlx-ticks" aria-hidden="true"></div>
                    <div class="tlx-anchors">
                        <span data-ja="${question.anchors[0]}" data-en="${question.anchors_en ? question.anchors_en[0] : question.anchors[0]}">${anchors[0]}</span>
                        <span data-ja="${question.anchors[1]}" data-en="${question.anchors_en ? question.anchors_en[1] : question.anchors[1]}">${anchors[1]}</span>
                    </div>
                </div>
            `;
        } else if (question.type === 'section') {
            const sid = `${question.id}-title`;
            const titleText = currentLang === 'ja' ? (question.title || '') : (question.title_en || question.title || '');
            const noteText = currentLang === 'ja' ? (question.note || '') : (question.note_en || question.note || '');
            html += `
                <div class="survey-section" role="separator" aria-labelledby="${sid}">
                    <div class="section-bar">
                        <h3 id="${sid}" class="section-title" data-ja="${question.title || ''}" data-en="${question.title_en || question.title || ''}">${titleText}</h3>
                    </div>
                    ${noteText ? `<p class="section-note" data-ja="${question.note || ''}" data-en="${question.note_en || question.note || ''}">${noteText}</p>` : ''}
                </div>
            `;
        } else if (question.type === 'ueq7') {
            const name = question.id;
            const leftText = currentLang === 'ja' ? question.left : (question.left_en || question.left);
            const rightText = currentLang === 'ja' ? question.right : (question.right_en || question.right);
            const radios = Array.from({ length: 7 }, (_, i) => {
                const v = i + 1;
                return `
                    <label class="ueq-choice" for="${name}_${v}">
                        <input type="radio" id="${name}_${v}" name="${name}" value="${v}" ${v === 1 && question.required ? 'required' : ''} />
                    </label>
                `;
            }).join('');

            html += `
                <div class="ueq-row">
                    <div class="ueq-left" data-ja="${question.left}" data-en="${question.left_en || question.left}">${leftText}</div>
                    <div class="ueq-scale" aria-label="${leftText} ～ ${rightText}">
                        ${radios}
                    </div>
                    <div class="ueq-right" style="text-align:right" data-ja="${question.right}" data-en="${question.right_en || question.right}">${rightText}</div>
                </div>
            `;
        } else if (question.type === 'text') {
            const placeholderText = currentLang === 'ja' ? (question.placeholder || '') : (question.placeholder_en || question.placeholder || '');
            html += `
                <textarea id="${question.id}" 
                          name="${question.id}" 
                          placeholder="${placeholderText}"
                          rows="4" 
                          style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;"
                          ${question.required ? 'required' : ''}></textarea>
            `;
        } else if (question.type === 'radio') {
            // Likert汎用UI（5点法ドット＋テキスト）: 明示フラグ ui==='likert' のみで判定
            if (question.ui === 'likert') {
                const name = question.id;
                const radios = question.options.map((option, i) => {
                    const optionLabel = currentLang === 'ja' ? option.label : (option.label_en || option.label);
                    return `
                        <label class="sus-dot" for="${name}_${option.value}">
                            <input type="radio"
                                   id="${name}_${option.value}"
                                   name="${name}"
                                   value="${option.value}"
                                   ${i === 0 && question.required ? 'required' : ''}
                                   aria-label="${optionLabel}">
                            <span class="sus-text" data-ja="${option.label}" data-en="${option.label_en || option.label}">${optionLabel}</span>
                        </label>
                    `;
                }).join('');

                html += `
                    <div class="sus-scale" role="radiogroup" aria-label="SUS 1～5">
                        ${radios}
                    </div>
                `;
            } else {
                html += `<div class="likert-group">`;
                question.options.forEach((option, i) => {
                    const optionLabel = currentLang === 'ja' ? option.label : (option.label_en || option.label);
                    html += `
                        <label class="likert-option" for="${question.id}_${option.value}">
                            <input type="radio"
                                   id="${question.id}_${option.value}"
                                   name="${question.id}"
                                   value="${option.value}"
                                   ${i === 0 && question.required ? 'required' : ''}>
                            <span data-ja="${option.label}" data-en="${option.label_en || option.label}">${optionLabel}</span>
                        </label>
                    `;
                });
                html += `</div>`;
            }
        } else if (question.type === 'select') {
            html += `<select id="${question.id}" name="${question.id}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">`;
            question.options.forEach(option => {
                const optionLabel = currentLang === 'ja' ? option.label : (option.label_en || option.label);
                const selected = option.value === question.defaultValue ? 'selected' : '';
                html += `<option value="${option.value}" ${selected} data-ja="${option.label}" data-en="${option.label_en || option.label}">${optionLabel}</option>`;
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
            submitBtn.textContent = this.languageManager.getCurrentLanguage() === 'ja' ? '結果を送信' : 'Submit Results';
        } else {
            submitBtn.style.display = 'inline-block';
            submitBtn.textContent = this.languageManager.getCurrentLanguage() === 'ja' ? '次へ' : 'Next';
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
            // 未回答バリデーション（カスタム文言で案内）
            const formEl = document.getElementById('survey-form');
            if (formEl && !formEl.checkValidity()) {
                const alertMessage = this.languageManager.getCurrentLanguage() === 'ja' 
                    ? '全ての質問に回答してください' 
                    : 'Please answer all questions';
                alert(alertMessage);
                const firstInvalid = formEl.querySelector(':invalid');
                if (firstInvalid && typeof firstInvalid.scrollIntoView === 'function') {
                    firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }
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
            const backBtn = document.getElementById('back-btn');
            const resetBtn = document.getElementById('reset-btn');
            
            submitBtn.disabled = true;
            submitBtn.textContent = '送信中...';
            backBtn.disabled = true;
            resetBtn.disabled = true;

            // 送信データを取得
            const data = this.surveyManager.getAllResults();
            console.log('送信データ:', data);

            // GASに送信
            const result = await this.gasSender.submitData(data);
            console.log('送信結果:', result);

            // 成功画面を表示（上: 成功文面 / 下: パスワード）
            const isInterval = data.userInfo.task_state === 'interval';
            let msg;
            if (this.languageManager.getCurrentLanguage() === 'ja') {
                msg = isInterval
                    ? '結果が正常に送信されました。'
                    : '結果が正常に送信されました。ご協力ありがとうございました。実験実施者にお伝えください。';
            } else {
                msg = isInterval
                    ? 'Results have been successfully submitted.'
                    : 'Results have been successfully submitted. Thank you for your cooperation. Please inform the experiment conductor.';
            }
            const code = isInterval ? (this.METHOD_CODE_MAP[data.userInfo.method] || '0000') : '';
            this.showSuccess(msg, code);

            // ボタンを非表示
            submitBtn.style.display = 'none';
            backBtn.style.display = 'none';
            resetBtn.style.display = 'none';

        } catch (error) {
            console.error('GAS送信エラー:', error);
            this.showError('送信に失敗しました: ' + error.message);
            
            // ボタンを再有効化
            const submitBtn = document.getElementById('submit-btn');
            const backBtn = document.getElementById('back-btn');
            const resetBtn = document.getElementById('reset-btn');
            
            submitBtn.disabled = false;
            submitBtn.textContent = '結果を送信';
            backBtn.disabled = false;
            resetBtn.disabled = false;
        }
    }

    // 戻る処理
    handleBack() {
        const confirmMessage = this.languageManager.getCurrentLanguage() === 'ja' 
            ? '前のサーベイに戻りますか？現在の入力は保存されません。' 
            : 'Do you want to go back to the previous survey? Current input will not be saved.';
        if (confirm(confirmMessage)) {
            // 前のサーベイに戻る
            this.surveyManager.previousSurvey();
            this.displayCurrentSurvey();
        }
    }

    // リセット処理
    handleReset() {
        const confirmMessage = this.languageManager.getCurrentLanguage() === 'ja' 
            ? '入力をリセットしてもよろしいですか？' 
            : 'Are you sure you want to reset the input?';
        if (confirm(confirmMessage)) {
            const form = document.getElementById('survey-form');
            form.reset();
        }
    }

    // エラーメッセージを表示
    showError(message) {
        const container = document.getElementById('survey-container');
        const errorLabel = this.languageManager.getCurrentLanguage() === 'ja' ? 'エラー:' : 'Error:';
        container.innerHTML = `
            <div class="error">
                <strong>${errorLabel}</strong> ${message}
            </div>
        `;
    }

    // 送信状態を表示（デバッグ用）
    showSubmissionStatus() {
        const status = this.gasSender.getSubmissionStatus();
        const history = this.gasSender.getSubmissionHistory();
        
        console.log('送信状態:', status);
        console.log('送信履歴:', history);
        
        // 送信履歴を画面に表示（デバッグ用）
        if (history.length > 0) {
            const container = document.getElementById('survey-container');
            const historyHtml = history.map(entry => `
                <div style="margin: 10px 0; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                    <strong>${entry.timestamp}</strong><br>
                    ステータス: ${entry.status}<br>
                    ${entry.error ? `エラー: ${entry.error}` : ''}
                </div>
            `).join('');
            
            container.innerHTML = `
                <div class="success">
                    <strong>送信履歴:</strong>
                    ${historyHtml}
                </div>
            `;
        }
    }

    // 送信履歴をクリア
    clearSubmissionHistory() {
        this.gasSender.clearHistory();
        console.log('送信履歴をクリアしました');
    }

    // 成功メッセージを表示（下部に任意でパスワード表示）
    showSuccess(message, code) {
        const container = document.getElementById('survey-container');
        const completeLabel = this.languageManager.getCurrentLanguage() === 'ja' ? '完了:' : 'Complete:';
        let html = `
            <div class="success">
                <strong>${completeLabel}</strong> ${message}
            </div>
        `;
        if (typeof code === 'string' && code.length > 0) {
            const passwordText = this.languageManager.getCurrentLanguage() === 'ja' 
                ? 'この4桁のパスワードを次のシステムに入力してください' 
                : 'Please enter this 4-digit password in the next system';
            const buttonText = this.languageManager.getCurrentLanguage() === 'ja' 
                ? 'コピーしてタブを閉じる' 
                : 'Copy and Close Tab';
            
            html += `
                <div style="font-family:system-ui, -apple-system, Segoe UI, Roboto, sans-serif; padding:24px; text-align:center;">
                    <div style="font-size:56px; font-weight:800; letter-spacing:8px; margin:8px 0 12px;">${code}</div>
                    <div style="font-size:14px; color:#555;">${passwordText}</div>
                    <button id="copy-and-close-btn" style="margin-top: 24px; padding: 16px 32px; font-size: 18px; font-weight: 600; background-color: #007bff; color: white; border: none; border-radius: 8px; cursor: pointer; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#0056b3'" onmouseout="this.style.backgroundColor='#007bff'">
                        ${buttonText}
                    </button>
                </div>
            `;
        }
        container.innerHTML = html;
        
        // ボタンのイベントリスナーを設定
        if (typeof code === 'string' && code.length > 0) {
            const copyAndCloseBtn = document.getElementById('copy-and-close-btn');
            if (copyAndCloseBtn) {
                copyAndCloseBtn.addEventListener('click', () => {
                    this.copyCodeAndCloseTab(code);
                });
            }
        }
    }
    
    // パスワードをコピーしてタブを閉じる
    copyCodeAndCloseTab(code) {
        try {
            // パスワードをクリップボードにコピー
            navigator.clipboard.writeText(code).then(() => {
                // コピー成功のフィードバック
                const btn = document.getElementById('copy-and-close-btn');
                if (btn) {
                    const copyCompleteText = this.languageManager.getCurrentLanguage() === 'ja' ? 'コピー完了！' : 'Copy Complete!';
                    btn.textContent = copyCompleteText;
                    btn.style.backgroundColor = '#28a745';
                    btn.disabled = true;
                    
                    // 1秒後にタブを閉じる
                    setTimeout(() => {
                        window.close();
                        // window.close()が動作しない場合の代替手段
                        if (!window.closed) {
                            // ユーザーに手動で閉じるよう案内
                            const manualCloseText = this.languageManager.getCurrentLanguage() === 'ja' ? 'タブを手動で閉じてください' : 'Please close the tab manually';
                            btn.textContent = manualCloseText;
                            btn.style.backgroundColor = '#6c757d';
                        }
                    }, 1000);
                }
            }).catch(err => {
                console.error('クリップボードへのコピーに失敗:', err);
                // フォールバック: 古いブラウザ対応
                const textArea = document.createElement('textarea');
                textArea.value = code;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                // 成功した場合と同じ処理
                const btn = document.getElementById('copy-and-close-btn');
                if (btn) {
                    const copyCompleteText = this.languageManager.getCurrentLanguage() === 'ja' ? 'コピー完了！' : 'Copy Complete!';
                    btn.textContent = copyCompleteText;
                    btn.style.backgroundColor = '#28a745';
                    btn.disabled = true;
                    
                    setTimeout(() => {
                        window.close();
                        if (!window.closed) {
                            const manualCloseText = this.languageManager.getCurrentLanguage() === 'ja' ? 'タブを手動で閉じてください' : 'Please close the tab manually';
                            btn.textContent = manualCloseText;
                            btn.style.backgroundColor = '#6c757d';
                        }
                    }, 1000);
                }
            });
        } catch (error) {
            console.error('エラーが発生しました:', error);
            const errorMessage = this.languageManager.getCurrentLanguage() === 'ja' ? 'エラーが発生しました: ' : 'An error occurred: ';
            alert(errorMessage + error.message);
        }
    }

    // showFinalScreen は未使用（レイアウト統一のため showSuccess に集約）
}

// アプリケーションを開始
document.addEventListener('DOMContentLoaded', () => {
    new SurveyApp();
});
