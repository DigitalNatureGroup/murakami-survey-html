// メインロジック - アンケートシステムの統合処理

/**
 * アンケート結果の送信処理（フロントエンドから呼び出される）
 * @param {Object} data - アンケートデータ
 * @return {Object} 送信結果
 */
function submitSurveyResult(data) {
  try {
    const {uid, method, session, surveyType, ...surveyData} = data;
    
    // スプレッドシートに保存
    const saveResult = saveSurveyResult(data);
    
    if (!saveResult.success) {
      return saveResult;
    }
    
    // 実験アプリにコールバック（オプション）
    let callbackResult = null;
    if (data.callbackUrl) {
      try {
        const response = UrlFetchApp.fetch(data.callbackUrl, {
          method: 'GET',
          muteHttpExceptions: true,
          timeout: 5000
        });
        callbackResult = {
          status: response.getResponseCode(),
          success: response.getResponseCode() === 200
        };
      } catch (error) {
        console.log('コールバック送信エラー:', error);
        callbackResult = { success: false, error: error.toString() };
      }
    }
    
    return {
      success: true, 
      message: 'アンケートを送信しました',
      callbackResult: callbackResult,
      rowNumber: saveResult.rowNumber
    };
    
  } catch (error) {
    console.error('アンケート送信エラー:', error);
    return {
      success: false,
      message: 'エラーが発生しました: ' + error.message
    };
  }
}

/**
 * テスト用関数
 */
function testSurvey() {
  const testData = {
    uid: 'TEST123',
    method: 'X',
    session: 'test-session',
    surveyType: 'nasa-tlx',
    mental: '75',
    physical: '60',
    temporal: '80',
    performance: '70',
    effort: '65',
    frustration: '45',
    overall: '72'
  };
  
  const result = submitSurveyResult(testData);
  console.log('テスト結果:', result);
}

/**
 * システム全体のテスト
 */
function runSystemTest() {
  console.log('=== システムテスト開始 ===');
  
  try {
    // 1. 設定の検証
    console.log('1. アンケート設定の検証...');
    const surveyTypes = getAvailableSurveyTypes();
    const methods = getAvailableMethods();
    
    console.log('利用可能なアンケートタイプ:', surveyTypes);
    console.log('利用可能なメソッド:', methods);
    
    // 2. 各アンケート設定の検証
    for (const surveyType of surveyTypes) {
      const isValid = validateSurveyConfig(surveyType);
      console.log(`${surveyType}: ${isValid ? '有効' : '無効'}`);
    }
    
    // 3. スプレッドシートの初期化テスト
    console.log('2. スプレッドシートの初期化...');
    initializeSpreadsheet();
    
    // 4. 各アンケートタイプのテスト送信
    console.log('3. 各アンケートタイプのテスト送信...');
    
    const testCases = [
      {
        uid: 'TEST_NASA',
        method: 'X',
        surveyType: 'nasa-tlx',
        mental: '75', physical: '60', temporal: '80',
        performance: '70', effort: '65', frustration: '45', overall: '72'
      },
      {
        uid: 'TEST_LIKERT',
        method: 'Y',
        surveyType: 'likert-scale',
        q1: '4', q2: '3', q3: 'テスト回答'
      },
      {
        uid: 'TEST_CUSTOM',
        method: 'Z',
        surveyType: 'custom-survey',
        rating: '5', comment: 'テストコメント'
      }
    ];
    
    for (const testCase of testCases) {
      const result = submitSurveyResult(testCase);
      console.log(`${testCase.surveyType}: ${result.success ? '成功' : '失敗'}`);
    }
    
    console.log('=== システムテスト完了 ===');
    
  } catch (error) {
    console.error('システムテストエラー:', error);
  }
}

/**
 * データのクリア（テスト用）
 */
function clearTestData() {
  try {
    const ss = SpreadsheetApp.openById(config.SPREADSHEET_CONFIG.SHEET_ID);
    const sheet = ss.getSheetByName(config.SPREADSHEET_CONFIG.SHEET_NAME);
    if (sheet) {
      const lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).clear();
        console.log('テストデータをクリアしました');
      } else {
        console.log('クリアするデータがありません');
      }
    }
    
  } catch (error) {
    console.error('データクリアエラー:', error);
  }
}

/**
 * システム情報の表示
 */
function showSystemInfo() {
  console.log('=== システム情報 ===');
  
  // アンケート設定情報
  const surveyTypes = getAvailableSurveyTypes();
  const methods = getAvailableMethods();
  
  console.log('アンケートタイプ数:', surveyTypes.length);
  console.log('メソッド数:', methods.length);
  
  for (const surveyType of surveyTypes) {
    const config_ = getSurveyConfig(surveyType);
    console.log(`${surveyType}: ${config_.name} (${config_.fields.length}項目)`);
  }
  
  // スプレッドシート情報
  const ss = SpreadsheetApp.openById(config.SPREADSHEET_CONFIG.SHEET_ID);
  if (ss) {
    console.log('スプレッドシート名:', ss.getName());
    console.log('スプレッドシートID:', ss.getId());
    
    const sheets = ss.getSheets();
    console.log('シート数:', sheets.length);
    
    for (const sheet of sheets) {
      const lastRow = sheet.getLastRow();
      const lastCol = sheet.getLastColumn();
      console.log(`  ${sheet.getName()}: ${lastRow}行 × ${lastCol}列`);
    }
  }
}
