/**
 * ユーティリティ関数
 * 共通の検証・整形処理
 */

/**
 * URLパラメータの検証
 * @param {Object} params - URLパラメータ
 * @return {Object} 検証結果
 */
function validateUrlParameters(params) {
  const errors = [];
  
  // UIDの検証
  if (!params.uid || typeof params.uid !== 'string' || params.uid.trim() === '') {
    errors.push('UIDが指定されていません');
  } else if (params.uid.length > 100) {
    errors.push('UIDが長すぎます（100文字以内）');
  }
  
  // セッションIDの検証
  if (!params.session || typeof params.session !== 'string' || params.session.trim() === '') {
    errors.push('セッションIDが指定されていません');
  } else if (params.session.length > 200) {
    errors.push('セッションIDが長すぎます（200文字以内）');
  }
  
  // インデックスの検証
  const idx = parseInt(params.idx || '0', 10);
  if (isNaN(idx) || idx < 0) {
    errors.push('インデックスが無効です');
  }
  
  return {
    valid: errors.length === 0,
    errors: errors,
    uid: params.uid ? params.uid.trim() : '',
    session: params.session ? params.session.trim() : '',
    idx: idx
  };
}

/**
 * ユーザーエージェントの解析
 * @param {string} userAgent - ユーザーエージェント文字列
 * @return {Object} 解析結果
 */
function parseUserAgent(userAgent) {
  if (!userAgent) {
    return {
      browser: 'Unknown',
      os: 'Unknown',
      device: 'Unknown',
      mobile: false
    };
  }
  
  const ua = userAgent.toLowerCase();
  
  // ブラウザ判定
  let browser = 'Unknown';
  if (ua.includes('chrome')) browser = 'Chrome';
  else if (ua.includes('firefox')) browser = 'Firefox';
  else if (ua.includes('safari')) browser = 'Safari';
  else if (ua.includes('edge')) browser = 'Edge';
  else if (ua.includes('opera')) browser = 'Opera';
  
  // OS判定
  let os = 'Unknown';
  if (ua.includes('windows')) os = 'Windows';
  else if (ua.includes('mac')) os = 'macOS';
  else if (ua.includes('linux')) os = 'Linux';
  else if (ua.includes('android')) os = 'Android';
  else if (ua.includes('ios')) os = 'iOS';
  
  // デバイス判定
  let device = 'Desktop';
  let mobile = false;
  if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone') || ua.includes('ipad')) {
    device = 'Mobile';
    mobile = true;
  }
  
  return {
    browser: browser,
    os: os,
    device: device,
    mobile: mobile,
    raw: userAgent
  };
}

/**
 * タイムスタンプの生成
 * @return {string} ISO形式のタイムスタンプ
 */
function generateTimestamp() {
  return new Date().toISOString();
}

/**
 * セッションIDの生成
 * @param {string} prefix - プレフィックス
 * @return {string} セッションID
 */
function generateSessionId(prefix = '') {
  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}${timestamp}_${random}`;
}

/**
 * データのサニタイズ
 * @param {*} data - サニタイズするデータ
 * @return {*} サニタイズされたデータ
 */
function sanitizeData(data) {
  if (typeof data === 'string') {
    // HTMLタグを除去
    return data.replace(/<[^>]*>/g, '');
  }
  
  if (Array.isArray(data)) {
    return data.map(item => sanitizeData(item));
  }
  
  if (typeof data === 'object' && data !== null) {
    const sanitized = {};
    for (const [key, value] of Object.entries(data)) {
      sanitized[key] = sanitizeData(value);
    }
    return sanitized;
  }
  
  return data;
}

/**
 * エラーレスポンスの生成
 * @param {string} message - エラーメッセージ
 * @param {number} statusCode - ステータスコード
 * @return {Object} エラーレスポンス
 */
function createErrorResponse(message, statusCode = 400) {
  return {
    ok: false,
    error: message,
    statusCode: statusCode,
    timestamp: generateTimestamp()
  };
}

/**
 * 成功レスポンスの生成
 * @param {*} data - レスポンスデータ
 * @param {string} message - メッセージ
 * @return {Object} 成功レスポンス
 */
function createSuccessResponse(data, message = 'Success') {
  return {
    ok: true,
    data: data,
    message: message,
    timestamp: generateTimestamp()
  };
}

/**
 * ログ出力
 * @param {string} level - ログレベル
 * @param {string} message - ログメッセージ
 * @param {*} data - 追加データ
 */
function logMessage(level, message, data = null) {
  const timestamp = generateTimestamp();
  const logData = {
    timestamp: timestamp,
    level: level,
    message: message
  };
  
  if (data !== null) {
    logData.data = data;
  }
  
  console.log(JSON.stringify(logData));
  
  // エラーログの場合はStackdriverにも送信
  if (level === 'ERROR') {
    console.error(message, data);
  }
}

/**
 * 設定値の取得
 * @param {string} key - 設定キー
 * @param {*} defaultValue - デフォルト値
 * @return {*} 設定値
 */
function getConfig(key, defaultValue = null) {
  try {
    const properties = PropertiesService.getScriptProperties();
    const value = properties.getProperty(key);
    
    if (value === null) {
      return defaultValue;
    }
    
    // JSONとして解析を試行
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
    
  } catch (error) {
    logMessage('WARN', `設定値の取得に失敗: ${key}`, error);
    return defaultValue;
  }
}

/**
 * 設定値の設定
 * @param {string} key - 設定キー
 * @param {*} value - 設定値
 * @return {boolean} 設定成功フラグ
 */
function setConfig(key, value) {
  try {
    const properties = PropertiesService.getScriptProperties();
    const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
    properties.setProperty(key, stringValue);
    return true;
  } catch (error) {
    logMessage('ERROR', `設定値の設定に失敗: ${key}`, error);
    return false;
  }
}
