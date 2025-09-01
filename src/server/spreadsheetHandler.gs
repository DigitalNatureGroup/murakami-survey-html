// スプレッドシート操作管理

// スプレッドシートの構造定義
const SPREADSHEET_STRUCTURE = {
  // メイン結果シート
  'survey_results': {
    name: config.SPREADSHEET_CONFIG.SHEET_NAME,
    headers: [
      'タイムスタンプ', 'UID', 'Method', 'Session', 'SurveyType',
      '精神的要求', '身体的要求', '時間的要求', '作業成績', '努力', '欲求不満', '全体的負荷',
      '質問1', '質問2', '質問3', '評価', 'コメント'
    ],
    columnWidths: {
      1: 150,  // タイムスタンプ
      2: 100,  // UID
      3: 80,   // Method
      4: 150,  // Session
      5: 120,  // SurveyType
      6: 100,  // 精神的要求
      7: 100,  // 身体的要求
      8: 100,  // 時間的要求
      9: 100,  // 作業成績
      10: 80,  // 努力
      11: 100, // 欲求不満
      12: 100, // 全体的負荷
      13: 100, // 質問1
      14: 100, // 質問2
      15: 100, // 質問3
      16: 80,  // 評価
      17: 150  // コメント
    }
  },
  
  // 設定管理シート
  'survey_configs': {
    name: config.SPREADSHEET_CONFIG.CONFIG_SHEET_NAME || 'survey_configs',
    headers: [
      'SurveyType', 'Method', 'Template', 'Name', 'Description', 'Created', 'Updated'
    ],
    columnWidths: {
      1: 120,  // SurveyType
      2: 80,   // Method
      3: 120,  // Template
      4: 200,  // Name
      5: 300,  // Description
      6: 150,  // Created
      7: 150   // Updated
    }
  },
  
  // 統計情報シート
  'statistics': {
    name: config.SPREADSHEET_CONFIG.STATS_SHEET_NAME || 'statistics',
    headers: [
      'SurveyType', 'Method', 'TotalResponses', 'LastResponse', 'AverageScore', 'Updated'
    ],
    columnWidths: {
      1: 120,  // SurveyType
      2: 80,   // Method
      3: 120,  // TotalResponses
      4: 150,  // LastResponse
      5: 120,  // AverageScore
      6: 150   // Updated
    }
  }
};

/**
 * スプレッドシートの初期化
 */
function initializeSpreadsheet() {
  const ss = SpreadsheetApp.openById(config.SPREADSHEET_CONFIG.SHEET_ID);
  
  // 各シートを初期化
  for (const [key, sheetCfg] of Object.entries(SPREADSHEET_STRUCTURE)) {
    initializeSheet(ss, sheetCfg);
  }
  
  console.log('スプレッドシートを初期化しました');
}

/**
 * 個別シートの初期化
 * @param {Spreadsheet} spreadsheet - スプレッドシートオブジェクト
 * @param {Object} config - シート設定
 */
function initializeSheet(spreadsheet, sheetCfg) {
  let sheet = spreadsheet.getSheetByName(sheetCfg.name);
  
  // シートが存在しない場合は作成
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetCfg.name);
  }
  
  // ヘッダーを設定
  const headerRange = sheet.getRange(1, 1, 1, sheetCfg.headers.length);
  headerRange.setValues([sheetCfg.headers]);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#f0f0f0');
  
  // 列幅を調整
  for (const [col, width] of Object.entries(sheetCfg.columnWidths)) {
    sheet.setColumnWidth(parseInt(col), width);
  }
  
  // フィルターを設定
  sheet.getRange(1, 1, 1, sheetCfg.headers.length).createFilter();
  
  console.log(`シート "${sheetCfg.name}" を初期化しました`);
}

/**
 * アンケート結果を保存
 * @param {Object} data - アンケートデータ
 * @return {Object} 保存結果
 */
function saveSurveyResult(data) {
  try {
    const {uid, method, session, surveyType, ...surveyData} = data;
    
    // スプレッドシートに保存
    const ss = SpreadsheetApp.openById(config.SPREADSHEET_CONFIG.SHEET_ID);
    const sheet = ss.getSheetByName(SPREADSHEET_STRUCTURE['survey_results'].name);
    
    if (!sheet) {
      throw new Error('survey_resultsシートが見つかりません');
    }
    
    // データ行を作成（動的にフィールドを処理）
    const row = [
      new Date(),    // タイムスタンプ
      uid,           // 参加者ID
      method,        // 実験条件
      session,       // セッションID
      surveyType,    // アンケートタイプ
    ];
    
    // 各アンケートタイプに応じてデータを追加
    if (surveyType === 'nasa-tlx') {
      row.push(
        surveyData.mental || '',
        surveyData.physical || '',
        surveyData.temporal || '',
        surveyData.performance || '',
        surveyData.effort || '',
        surveyData.frustration || '',
        surveyData.overall || ''
      );
    } else if (surveyType === 'likert-scale') {
      row.push(
        '', '', '', '', '', '', '', // NASA-TLX用の空セル
        surveyData.q1 || '',
        surveyData.q2 || '',
        surveyData.q3 || ''
      );
    } else if (surveyType === 'custom-survey') {
      row.push(
        '', '', '', '', '', '', '', // NASA-TLX用の空セル
        '', '', '', // Likert用の空セル
        surveyData.rating || '',
        surveyData.comment || ''
      );
    }
    
    sheet.appendRow(row);
    
    // 統計情報を更新
    updateStatistics(surveyType, method);
    
    return {
      success: true,
      message: 'アンケート結果を保存しました',
      rowNumber: sheet.getLastRow()
    };
    
  } catch (error) {
    console.error('アンケート結果保存エラー:', error);
    return {
      success: false,
      message: 'エラーが発生しました: ' + error.message
    };
  }
}

/**
 * 統計情報を更新
 * @param {string} surveyType - アンケートタイプ
 * @param {string} method - メソッド
 */
function updateStatistics(surveyType, method) {
  try {
    const ss = SpreadsheetApp.openById(config.SPREADSHEET_CONFIG.SHEET_ID);
    const sheet = ss.getSheetByName(SPREADSHEET_STRUCTURE['statistics'].name);
    
    if (!sheet) return;
    
    // 既存の統計行を検索
    const data = sheet.getDataRange().getValues();
    let rowIndex = -1;
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === surveyType && data[i][1] === method) {
        rowIndex = i + 1;
        break;
      }
    }
    
    // 統計データを計算
    const stats = calculateStatistics(surveyType, method);
    
    if (rowIndex > 0) {
      // 既存行を更新
      sheet.getRange(rowIndex, 3, 1, 4).setValues([[
        stats.totalResponses,
        stats.lastResponse,
        stats.averageScore,
        new Date()
      ]]);
    } else {
      // 新しい行を追加
      sheet.appendRow([
        surveyType,
        method,
        stats.totalResponses,
        stats.lastResponse,
        stats.averageScore,
        new Date()
      ]);
    }
    
  } catch (error) {
    console.error('統計情報更新エラー:', error);
  }
}

/**
 * 統計データを計算
 * @param {string} surveyType - アンケートタイプ
 * @param {string} method - メソッド
 * @return {Object} 統計データ
 */
function calculateStatistics(surveyType, method) {
  const ss = SpreadsheetApp.openById(config.SPREADSHEET_CONFIG.SHEET_ID);
  const sheet = ss.getSheetByName(SPREADSHEET_STRUCTURE['survey_results'].name);
  
  if (!sheet) {
    return { totalResponses: 0, lastResponse: null, averageScore: 0 };
  }
  
  const data = sheet.getDataRange().getValues();
  const filteredData = data.filter(row => 
    row[4] === surveyType && row[2] === method
  );
  
  const totalResponses = filteredData.length;
  const lastResponse = totalResponses > 0 ? filteredData[filteredData.length - 1][0] : null;
  
  // 平均スコアを計算（数値フィールドのみ）
  let totalScore = 0;
  let scoreCount = 0;
  
  for (const row of filteredData) {
    for (let i = 5; i < row.length; i++) {
      if (row[i] !== '' && !isNaN(row[i])) {
        totalScore += parseFloat(row[i]);
        scoreCount++;
      }
    }
  }
  
  const averageScore = scoreCount > 0 ? (totalScore / scoreCount).toFixed(2) : 0;
  
  return {
    totalResponses,
    lastResponse,
    averageScore
  };
}

/**
 * アンケート結果を取得
 * @param {string} surveyType - アンケートタイプ（オプション）
 * @param {string} method - メソッド（オプション）
 * @param {string} uid - UID（オプション）
 * @return {Array} 結果データ
 */
function getSurveyResults(surveyType = null, method = null, uid = null) {
  try {
    const ss = SpreadsheetApp.openById(config.SPREADSHEET_CONFIG.SHEET_ID);
    const sheet = ss.getSheetByName(SPREADSHEET_STRUCTURE['survey_results'].name);
    
    if (!sheet) {
      return [];
    }
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const rows = data.slice(1);
    
    // フィルタリング
    let filteredRows = rows;
    
    if (surveyType) {
      filteredRows = filteredRows.filter(row => row[4] === surveyType);
    }
    
    if (method) {
      filteredRows = filteredRows.filter(row => row[2] === method);
    }
    
    if (uid) {
      filteredRows = filteredRows.filter(row => row[1] === uid);
    }
    
    // 結果をオブジェクトの配列に変換
    const results = filteredRows.map(row => {
      const result = {};
      headers.forEach((header, index) => {
        result[header] = row[index];
      });
      return result;
    });
    
    return results;
    
  } catch (error) {
    console.error('アンケート結果取得エラー:', error);
    return [];
  }
}

/**
 * データをエクスポート（CSV形式）
 * @param {string} surveyType - アンケートタイプ（オプション）
 * @param {string} method - メソッド（オプション）
 * @return {string} CSVデータ
 */
function exportSurveyResults(surveyType = null, method = null) {
  const results = getSurveyResults(surveyType, method);
  
  if (results.length === 0) {
    return '';
  }
  
  const headers = Object.keys(results[0]);
  const csvRows = [headers.join(',')];
  
  for (const result of results) {
    const row = headers.map(header => {
      const value = result[header];
      // カンマや改行を含む場合はダブルクォートで囲む
      if (typeof value === 'string' && (value.includes(',') || value.includes('\n'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    });
    csvRows.push(row.join(','));
  }
  
  return csvRows.join('\n');
}
