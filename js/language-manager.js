// 言語管理クラス
export class LanguageManager {
    constructor() {
        this.currentLang = 'ja'; // デフォルトは日本語
        this.langBtns = null;
        this.langContents = null;
        this.init();
    }

    init() {
        // DOM要素の取得
        this.langBtns = document.querySelectorAll('.lang-btn');
        this.langContents = document.querySelectorAll('[data-ja], [data-en]');
        
        // イベントリスナーの設定
        this.setupEventListeners();
        
        // 初期化：保存された言語設定または日本語をデフォルトに
        const savedLang = localStorage.getItem('preferred-language') || 'ja';
        this.switchLanguage(savedLang);
    }

    // 言語切り替え
    switchLanguage(lang) {
        this.currentLang = lang;
        
        // すべての多言語対応要素のテキストを切り替え
        this.updateAllLanguageContent();
        
        // アクティブボタンの状態を更新
        this.langBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            }
        });
        
        // HTMLのlang属性を更新
        document.documentElement.lang = lang;
        
        // ローカルストレージに言語設定を保存
        localStorage.setItem('preferred-language', lang);
        
        // カスタムイベントを発火（他のモジュールで言語変更を検知できるように）
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    }

    // すべての多言語対応要素のテキストを更新
    updateAllLanguageContent() {
        // 現在のDOMから多言語対応要素を再取得
        this.langContents = document.querySelectorAll('[data-ja], [data-en]');
        
        this.langContents.forEach(element => {
            if (element.dataset[this.currentLang]) {
                element.textContent = element.dataset[this.currentLang];
            }
        });
    }

    // イベントリスナーの設定
    setupEventListeners() {
        this.langBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                this.switchLanguage(lang);
            });
        });
    }

    // 現在の言語を取得
    getCurrentLanguage() {
        return this.currentLang;
    }

    // 指定された言語のテキストを取得
    getText(key, fallback = '') {
        const element = document.querySelector(`[data-${this.currentLang}="${key}"]`);
        if (element) {
            return element.textContent;
        }
        return fallback;
    }

    // 動的にテキストを更新（新しく追加された要素用）
    updateDynamicContent() {
        // 無限ループを避けるため、switchLanguageは呼ばない
        this.updateAllLanguageContent();
    }
}
