/**
 * 設定管理
 * アプリケーション全体の設定値を一元管理
 */

// ========================================
// スプレッドシート設定
// ========================================
const SPREADSHEET_CONFIG = {
  // スプレッドシートID（ここを変更してください）
  SHEET_ID: '1yAWUlasKNCL0KYXhnG1PWg8e3hepjIl_-VPhgNE2azQ',
  
  // シート名
  SHEET_NAME: 'responses'
};

// ========================================
// アプリケーション設定
// ========================================
const APP_CONFIG = {
  // タイムゾーン
  TIMEZONE: 'Asia/Tokyo',
  
  // セッション有効期限（秒）
  MAX_SESSION_DURATION: 3600,
  
  // ログ機能
  ENABLE_LOGGING: true,
  
  // 進捗追跡
  ENABLE_PROGRESS_TRACKING: true,
  
  // デバッグモード
  DEBUG_MODE: true
};

// ========================================
// アンケート設定
// ========================================
const SURVEY_CONFIG = {
  // デフォルトのアンケート設定
  DEFAULT_SURVEY: 'nasa-tlx',
  
  // 利用可能なアンケートタイプ
  AVAILABLE_TYPES: ['nasa-tlx', 'likert-scale', 'custom-survey'],
  
  // 利用可能なメソッド
  AVAILABLE_METHODS: ['X', 'Y', 'Z']
};

// ========================================
// 設定取得関数
// ========================================

/**
 * スプレッドシート設定を取得
 * @param {string} key - 設定キー
 * @return {string} 設定値
 */
function getSpreadsheetConfig(key) {
  return SPREADSHEET_CONFIG[key] || null;
}

/**
 * アプリケーション設定を取得
 * @param {string} key - 設定キー
 * @return {any} 設定値
 */
function getAppConfig(key) {
  return APP_CONFIG[key] || null;
}

/**
 * アンケート設定を取得（名称衝突回避のため getSurveySetting に変更）
 * @param {string} key - 設定キー
 * @return {any} 設定値
 */
function getSurveySetting(key) {
  return SURVEY_CONFIG[key] || null;
}

/**
 * すべての設定を取得
 * @return {Object} 全設定
 */
function getAllConfig() {
  return {
    spreadsheet: SPREADSHEET_CONFIG,
    app: APP_CONFIG,
    survey: SURVEY_CONFIG,
    timestamp: new Date().toISOString()
  };
}

/**
 * 設定を更新（開発・テスト用）
 * @param {string} category - 設定カテゴリ
 * @param {string} key - 設定キー
 * @param {any} value - 新しい値
 * @return {boolean} 成功したかどうか
 */
function updateConfig(category, key, value) {
  try {
    switch (category) {
      case 'spreadsheet':
        if (SPREADSHEET_CONFIG.hasOwnProperty(key)) {
          SPREADSHEET_CONFIG[key] = value;
          return true;
        }
        break;
      case 'app':
        if (APP_CONFIG.hasOwnProperty(key)) {
          APP_CONFIG[key] = value;
          return true;
        }
        break;
      case 'survey':
        if (SURVEY_CONFIG.hasOwnProperty(key)) {
          SURVEY_CONFIG[key] = value;
          return true;
        }
        break;
    }
    return false;
  } catch (error) {
    console.error('設定更新エラー:', error);
    return false;
  }
}

/**
 * 設定の検証
 * @return {Object} 検証結果
 */
function validateConfig() {
  const results = [];
  
  // 設定オブジェクトの存在チェック
  if (!SPREADSHEET_CONFIG || !APP_CONFIG || !SURVEY_CONFIG) {
    return {
      valid: false,
      results: [],
      message: '設定オブジェクトが正しく定義されていません'
    };
  }
  
  // スプレッドシートIDの検証
  const sheetId = SPREADSHEET_CONFIG.SHEET_ID;
  const sheetIdValid = sheetId && sheetId !== '1yAWUlasKNCL0KYXhnG1PWg8e3hepjIl_-VPhgNE2azQ' && sheetId.length > 20;
  
  results.push({
    category: 'spreadsheet',
    key: 'SHEET_ID',
    status: sheetIdValid ? 'PASS' : 'FAIL',
    message: sheetIdValid ? '有効なスプレッドシートID' : 'スプレッドシートIDを設定してください',
    value: sheetIdValid ? '***' : sheetId
  });
  
  // その他の設定の検証
  if (APP_CONFIG && APP_CONFIG.TIMEZONE) {
    results.push({
      category: 'app',
      key: 'TIMEZONE',
      status: 'PASS',
      message: 'タイムゾーン設定',
      value: APP_CONFIG.TIMEZONE
    });
  } else {
    results.push({
      category: 'app',
      key: 'TIMEZONE',
      status: 'FAIL',
      message: 'タイムゾーン設定が不足',
      value: 'NOT_SET'
    });
  }
  
  if (SURVEY_CONFIG && SURVEY_CONFIG.AVAILABLE_TYPES && Array.isArray(SURVEY_CONFIG.AVAILABLE_TYPES)) {
    results.push({
      category: 'survey',
      key: 'AVAILABLE_TYPES',
      status: 'PASS',
      message: '利用可能なアンケートタイプ',
      value: SURVEY_CONFIG.AVAILABLE_TYPES.length + ' types'
    });
  } else {
    results.push({
      category: 'survey',
      key: 'AVAILABLE_TYPES',
      status: 'FAIL',
      message: '利用可能なアンケートタイプが不足',
      value: 'NOT_SET'
    });
  }
  
  const allValid = results.every(r => r.status === 'PASS');
  
  return {
    valid: allValid,
    results: results,
    message: allValid ? 'すべての設定が有効です' : '設定に問題があります'
  };
}

/**
 * 設定情報の表示
 */
function showConfigInfo() {
  console.log('=== 設定情報 ===');
  
  // 設定オブジェクトの存在チェック
  if (!SPREADSHEET_CONFIG || !APP_CONFIG || !SURVEY_CONFIG) {
    console.error('❌ 設定オブジェクトが正しく定義されていません');
    return {
      error: '設定オブジェクトが正しく定義されていません',
      timestamp: new Date().toISOString()
    };
  }
  
  console.log('スプレッドシート設定:', SPREADSHEET_CONFIG);
  console.log('アプリケーション設定:', APP_CONFIG);
  console.log('アンケート設定:', SURVEY_CONFIG);
  
  const validation = validateConfig();
  console.log('設定検証結果:', validation);
  
  return validation;
}

/**
 * 設定のグローバル名前空間（ファイル名.変数名 で参照するため）
 */
const config = {
  SPREADSHEET_CONFIG: SPREADSHEET_CONFIG,
  APP_CONFIG: APP_CONFIG,
  SURVEY_CONFIG: SURVEY_CONFIG
};
