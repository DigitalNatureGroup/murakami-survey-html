// Google Apps Script (GAS) サンプルコード
// このコードをGoogle Apps Scriptにコピーして使用してください

function doPost(e) {
  try {
    var uid = (e.parameter.uid || '').trim();
    var cond = (e.parameter.condition || '').trim();
    var method = (e.parameter.method || '').trim();
    var payload = (e.parameter.payload || '').trim(); // ← 名前合わせる
    if (!uid || !cond || !method || !payload) throw new Error('missing fields');

    var data = JSON.parse(payload);

    // 複数行の保存: rows = [ [..7列..], [..], ... ]
    var rows = buildRows_(uid, cond, method, data);  // 行配列を作る関数（任意実装）
    var ss = SpreadsheetApp.openById('1yAWUlasKNCL0KYXhnG1PWg8e3hepjIl_-VPhgNE2azQ');
    var sh = ss.getSheetByName('hummingbird-survey') || ss.insertSheet('hummingbird-survey');
    sh.getRange(sh.getLastRow()+1, 1, rows.length, rows[0].length).setValues(rows);

    // 完了ページ（HTML）で4桁コード等を表示
    var t = HtmlService.createHtmlOutput('<h2>送信完了</h2><p>ありがとうございました。</p>');
    return t.setTitle('完了');
  } catch (err) {
    return HtmlService.createHtmlOutput('<h2>エラー</h2><pre>'+String(err)+'</pre>');
  }
}

// 行配列を作る関数
function buildRows_(uid, cond, method, data) {
  var rows = [];
  var timestamp = new Date().toISOString();
  
  // 各サーベイの結果を処理
  for (var surveyId in data.results) {
    var surveyResults = data.results[surveyId];
    
    for (var questionId in surveyResults) {
      var value = surveyResults[questionId];
      
      rows.push([
        uid,
        cond,
        method,
        timestamp,
        surveyId,
        questionId,
        value
      ]);
    }
  }
  
  return rows;
}

// スプレッドシートの初期設定
function setupSpreadsheet() {
  var ss = SpreadsheetApp.openById('1yAWUlasKNCL0KYXhnG1PWg8e3hepjIl_-VPhgNE2azQ');
  var sh = ss.getSheetByName('hummingbird-survey') || ss.insertSheet('hummingbird-survey');
  
  // ヘッダー行を設定
  var headers = [
    'UID',
    'Condition', 
    'Method',
    'Timestamp',
    'SurveyID',
    'QuestionID',
    'Value'
  ];
  
  sh.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // ヘッダー行のスタイルを設定
  sh.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#f0f0f0');
}

// テスト用関数
function testDoPost() {
  var testData = {
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
  
  var mockEvent = {
    parameter: {
      uid: "123",
      condition: "interval",
      method: "manual",
      payload: JSON.stringify(testData)
    }
  };
  
  var result = doPost(mockEvent);
  Logger.log(result.getContent());
}
