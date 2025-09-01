// Google Apps Script (GAS) サンプルコード
// このコードをGoogle Apps Scriptにコピーして使用してください

function doPost(e) {
  try {
    // リクエストデータを取得
    const data = JSON.parse(e.postData.contents);
    
    // スプレッドシートを取得
    const spreadsheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID'); // スプレッドシートIDを設定
    const sheet = spreadsheet.getSheetByName('SurveyResults'); // シート名を設定
    
    // データを整形
    const rowData = formatDataForSheet(data);
    
    // スプレッドシートに追加
    sheet.appendRow(rowData);
    
    // 成功レスポンス
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'データが正常に保存されました' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // エラーレスポンス
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function formatDataForSheet(data) {
  const userInfo = data.userInfo;
  const results = data.results;
  const timestamp = data.timestamp;
  
  // ヘッダー行（初回実行時に手動で追加）
  // UID, Condition, Method, Timestamp, SurveyID, QuestionID, Value
  
  const rows = [];
  
  // 各サーベイの結果を処理
  for (const surveyId in results) {
    const surveyResults = results[surveyId];
    
    for (const questionId in surveyResults) {
      const value = surveyResults[questionId];
      
      rows.push([
        userInfo.uid,
        userInfo.condition,
        userInfo.method,
        timestamp,
        surveyId,
        questionId,
        value
      ]);
    }
  }
  
  return rows;
}

// テスト用関数
function testDoPost() {
  const testData = {
    userInfo: {
      uid: "123",
      condition: "interval",
      method: "manual"
    },
    results: {
      "nasa-tlx": {
        "mental": "50",
        "physical": "30",
        "temporal": "40"
      },
      "sus": {
        "sus1": "4",
        "sus2": "2"
      }
    },
    timestamp: new Date().toISOString()
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

// スプレッドシートの初期設定
function setupSpreadsheet() {
  const spreadsheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID');
  const sheet = spreadsheet.getSheetByName('SurveyResults');
  
  // ヘッダー行を設定
  const headers = [
    'UID',
    'Condition', 
    'Method',
    'Timestamp',
    'SurveyID',
    'QuestionID',
    'Value'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // ヘッダー行のスタイルを設定
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#f0f0f0');
}
