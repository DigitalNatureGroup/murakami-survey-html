/**
 * ストレージ管理
 * スプレッドシートへのデータ保存と取得
 */

// スプレッドシート設定（config.gsから取得）
var SHEET_ID = null;
var SHEET_NAME = null;

/**
 * スプレッドシート設定を初期化
 */
function initializeStorageConfig() {
  SHEET_ID = getSpreadsheetConfig('SHEET_ID');
  SHEET_NAME = getSpreadsheetConfig('SHEET_NAME');
  console.log('ストレージ設定を初期化しました:', { SHEET_ID: SHEET_ID, SHEET_NAME: SHEET_NAME });
}

/**
 * 設定値を取得するヘルパー関数（config.gsに移行済み）
 * @deprecated 代わりに getSpreadsheetConfig() を使用してください
 */
function getConfig(key, defaultValue) {
  console.warn('getConfig()は非推奨です。getSpreadsheetConfig()を使用してください。');
  return getSpreadsheetConfig(key) || defaultValue;
}

/**
 * 設定値を設定するヘルパー関数（config.gsに移行済み）
 * @deprecated 代わりに updateConfig() を使用してください
 */
function setConfig(key, value) {
  console.warn('setConfig()は非推奨です。updateConfig()を使用してください。');
  return updateConfig('spreadsheet', key, value);
}

/**
 * 回答データをスプレッドシートに保存
 * @param {Object} payload - 保存するデータ
 * @return {Object} 保存結果
 */
function saveAnswers(payload) {
  try {
    // ペイロードの検証
    validatePayload_(payload);
    
    // スプレッドシートに保存
    const result = appendToSheet_(payload);
    
    // 進捗情報を更新（復帰用）
    updateProgress_(payload.uid, payload.session, payload.idx);
    
    return { 
      ok: true, 
      message: 'データが正常に保存されました',
      savedAt: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('データ保存エラー:', error);
    return { 
      ok: false, 
      error: error.message || 'データの保存に失敗しました'
    };
  }
}

/**
 * ペイロードの検証
 * @param {Object} payload - 検証するデータ
 * @throws {Error} 検証エラー
 */
function validatePayload_(payload) {
  if (!payload) {
    throw new Error('ペイロードが指定されていません');
  }
  
  if (!payload.uid || typeof payload.uid !== 'string' || payload.uid.trim() === '') {
    throw new Error('UIDが無効です');
  }
  
  if (!payload.session || typeof payload.session !== 'string' || payload.session.trim() === '') {
    throw new Error('セッションIDが無効です');
  }
  
  if (!payload.stepId || typeof payload.stepId !== 'string') {
    throw new Error('ステップIDが無効です');
  }
  
  if (typeof payload.idx !== 'number' || payload.idx < 0) {
    throw new Error('インデックスが無効です');
  }
  
  if (!payload.answers || typeof payload.answers !== 'object') {
    throw new Error('回答データが無効です');
  }
}

/**
 * スプレッドシートにデータを追加
 * @param {Object} payload - 保存するデータ
 * @return {Object} 保存結果
 */
function appendToSheet_(payload) {
  const sheetId = getSpreadsheetConfig('SHEET_ID');
  const sheetName = getSpreadsheetConfig('SHEET_NAME');
  
  if (!sheetId) {
    throw new Error('スプレッドシートIDが設定されていません。config.gsで設定してください。');
  }
  
  const ss = SpreadsheetApp.openById(sheetId);
  if (!ss) {
    throw new Error('スプレッドシートが見つかりません。SHEET_IDを確認してください。');
  }
  
  let sh = ss.getSheetByName(sheetName);
  if (!sh) {
    // シートが存在しない場合は作成
    sh = ss.insertSheet(sheetName);
    // ヘッダー行を追加
    sh.getRange(1, 1, 1, 7).setValues([
      ['UID', 'Session', 'StepID', 'Index', 'Answers', 'Timestamp', 'UserAgent']
    ]);
    // ヘッダー行のスタイルを設定
    sh.getRange(1, 1, 1, 7).setFontWeight('bold').setBackground('#f0f0f0');
  }
  
  const now = new Date();
  const answersJson = JSON.stringify(payload.answers || {});
  const userAgent = payload.userAgent || 'Unknown';
  
  // データ行を追加
  const rowData = [
    payload.uid,
    payload.session,
    payload.stepId,
    payload.idx,
    answersJson,
    now,
    userAgent
  ];
  
  sh.appendRow(rowData);
  
  // タイムスタンプ列のフォーマットを設定
  const lastRow = sh.getLastRow();
  sh.getRange(lastRow, 6).setNumberFormat('yyyy-mm-dd hh:mm:ss');
  
  return {
    row: lastRow,
    timestamp: now
  };
}

/**
 * 進捗情報を更新（復帰用）
 * @param {string} uid - ユーザーID
 * @param {string} session - セッションID
 * @param {number} idx - 現在のインデックス
 */
function updateProgress_(uid, session, progressKey) {
  try {
    const properties = PropertiesService.getScriptProperties();
    const key = `progress_${uid}_${session}`;
    properties.setProperty(key, JSON.stringify({
      uid: uid,
      session: session,
      idx: progressKey,
      updatedAt: new Date().toISOString()
    }));
  } catch (error) {
    console.warn('進捗情報の更新に失敗:', error);
  }
}

/**
 * 進捗情報を取得（復帰用）
 * @param {string} uid - ユーザーID
 * @param {string} session - セッションID
 * @return {Object|null} 進捗情報
 */
function getProgress(uid, session) {
  try {
    const properties = PropertiesService.getScriptProperties();
    const key = `progress_${uid}_${session}`;
    const progressData = properties.getProperty(key);
    
    if (progressData) {
      return JSON.parse(progressData);
    }
    
    return null;
  } catch (error) {
    console.warn('進捗情報の取得に失敗:', error);
    return null;
  }
}

/**
 * 特定のUID・セッションの回答履歴を取得
 * @param {string} uid - ユーザーID
 * @param {string} session - セッションID
 * @return {Array} 回答履歴の配列
 */
function getResponseHistory(uid, session) {
  try {
    const sheetId = getSpreadsheetConfig('SHEET_ID');
    const sheetName = getSpreadsheetConfig('SHEET_NAME');
    
    if (!sheetId) {
      throw new Error('スプレッドシートIDが設定されていません');
    }
    
    const ss = SpreadsheetApp.openById(sheetId);
    if (!ss) {
      throw new Error('スプレッドシートが見つかりません');
    }
    
    const sh = ss.getSheetByName(sheetName);
    if (!sh) {
      return [];
    }
    
    const data = sh.getDataRange().getValues();
    if (data.length <= 1) {
      return []; // ヘッダーのみ
    }
    
    // ヘッダーを除いて、UIDとセッションでフィルタリング
    const responses = data.slice(1).filter(row => 
      row[0] === uid && row[1] === session
    ).map(row => ({
      stepId: row[2],
      idx: row[3],
      answers: JSON.parse(row[4] || '{}'),
      timestamp: row[5],
      userAgent: row[6]
    }));
    
    return responses.sort((a, b) => a.idx - b.idx);
    
  } catch (error) {
    console.error('回答履歴の取得に失敗:', error);
    return [];
  }
}

/**
 * セッションの完了状態を確認
 * @param {string} uid - ユーザーID
 * @param {string} session - セッションID
 * @return {Object} 完了状態
 */
function checkSessionCompletion(uid, session) {
  try {
    const history = getResponseHistory(uid, session);
    const pipeline = getPipeline(session);
    
    if (history.length === 0) {
      return { completed: false, progress: 0, totalSteps: pipeline.length };
    }
    
    const lastResponse = history[history.length - 1];
    const completed = lastResponse.idx >= pipeline.length - 1; // doneステップに到達
    
    return {
      completed: completed,
      progress: lastResponse.idx + 1,
      totalSteps: pipeline.length,
      lastStep: lastResponse.stepId,
      lastUpdated: lastResponse.timestamp
    };
    
  } catch (error) {
    console.error('セッション完了状態の確認に失敗:', error);
    return { completed: false, progress: 0, totalSteps: 0, error: error.message };
  }
}

/**
 * スプレッドシートの初期化
 * @return {Object} 初期化結果
 */
function initializeSpreadsheet() {
  try {
    const ss = SpreadsheetApp.openById(config.SPREADSHEET_CONFIG.SHEET_ID);
    if (!ss) {
      throw new Error('スプレッドシートが見つかりません。SHEET_IDを確認してください。');
    }
    
    let sh = ss.getSheetByName(config.SPREADSHEET_CONFIG.SHEET_NAME);
    if (!sh) {
      sh = ss.insertSheet(config.SPREADSHEET_CONFIG.SHEET_NAME);
    }
    
    // ヘッダー行を設定
    const headers = ['UID', 'Session', 'StepID', 'Index', 'Answers', 'Timestamp', 'UserAgent'];
    sh.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // ヘッダーのスタイルを設定
    sh.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#f0f0f0')
      .setBorder(true, true, true, true, true, true);
    
    // 列幅の自動調整
    sh.autoResizeColumns(1, headers.length);
    
    return {
      ok: true,
      message: 'スプレッドシートが正常に初期化されました',
      sheetName: config.SPREADSHEET_CONFIG.SHEET_NAME,
      sheetId: sh.getSheetId()
    };
    
  } catch (error) {
    console.error('スプレッドシート初期化エラー:', error);
    return {
      ok: false,
      error: error.message
    };
  }
}
