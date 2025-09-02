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
    
    // サーベイごとに横持ち1行で保存（質問IDを列として展開）
    var ss = SpreadsheetApp.openById('1yAWUlasKNCL0KYXhnG1PWg8e3hepjIl_-VPhgNE2azQ');
    var timestamp = new Date().toISOString();

    for (var surveyId in data.results) {
      var surveyResults = data.results[surveyId];
      var sh = ss.getSheetByName(surveyId);
      if (!sh) {
        sh = ss.insertSheet(surveyId);
      }

      var headers = ensureWideHeaders_(sh, Object.keys(surveyResults));

      // 行配列をヘッダー順で作成
      var row = new Array(headers.length).fill('');
      row[0] = uid;
      row[1] = cond;
      row[2] = method;
      row[3] = timestamp;

      for (var qid in surveyResults) {
        var colIndex = headers.indexOf(qid);
        if (colIndex === -1) {
          // 念のため（通常はensureWideHeaders_で存在する）
          headers = ensureWideHeaders_(sh, [qid]);
          colIndex = headers.indexOf(qid);
          // 必要に応じてrow配列を拡張
          if (row.length < headers.length) {
            row.length = headers.length;
            for (var i = 0; i < headers.length; i++) if (typeof row[i] === 'undefined') row[i] = '';
          }
        }
        row[colIndex] = surveyResults[qid];
      }

      sh.getRange(sh.getLastRow()+1, 1, 1, headers.length).setValues([row]);
    }

    // 完了ページ（HTML）で4桁コード等を表示
    var t = HtmlService.createHtmlOutput('<h2>送信完了</h2><p>ありがとうございました。</p>');
    return t.setTitle('完了');
  } catch (err) {
    return HtmlService.createHtmlOutput('<h2>エラー</h2><pre>'+String(err)+'</pre>');
  }
}

// 横持ちヘッダーを保証し、現在の完全なヘッダー配列を返す
function ensureWideHeaders_(sheet, questionIds) {
  var baseHeaders = ['UID','Condition','Method','Timestamp'];
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();

  var currentHeaders = [];
  if (lastRow >= 1 && lastCol >= 1) {
    currentHeaders = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  }

  if (currentHeaders.length === 0) {
    // 初期作成: ベース + 今回の質問ID
    var newHeaders = baseHeaders.concat(questionIds);
    sheet.getRange(1, 1, 1, newHeaders.length).setValues([newHeaders]);
    styleHeader_(sheet, newHeaders.length);
    return newHeaders;
  }

  // ベースヘッダーの不足を補完（既存のブックを安全に移行）
  baseHeaders.forEach(function(h, idx){
    if (currentHeaders[idx] !== h) {
      // 先頭からベースヘッダーを強制整列
      currentHeaders = baseHeaders.concat(currentHeaders.filter(function(x){ return baseHeaders.indexOf(x) === -1; }));
      sheet.clearContents();
      sheet.getRange(1, 1, 1, currentHeaders.length).setValues([currentHeaders]);
      styleHeader_(sheet, currentHeaders.length);
    }
  });

  // 新しい質問IDを末尾に追加
  var appended = false;
  questionIds.forEach(function(q){
    if (currentHeaders.indexOf(q) === -1) {
      currentHeaders.push(q);
      appended = true;
    }
  });
  if (appended) {
    sheet.getRange(1, 1, 1, currentHeaders.length).setValues([currentHeaders]);
    styleHeader_(sheet, currentHeaders.length);
  }

  return currentHeaders;
}

// スプレッドシートの初期設定
function setupSpreadsheet() {
  var ss = SpreadsheetApp.openById('1yAWUlasKNCL0KYXhnG1PWg8e3hepjIl_-VPhgNE2azQ');
  var sh = ss.getSheetByName('README') || ss.insertSheet('README');
  if (sh.getLastRow() === 0) {
    sh.getRange(1,1).setValue('各サーベイID（例: nasa-tlx, sus）ごとに別シートに横持ち1行で保存されます。');
  }
}

// ヘッダー行の設定（サーベイ個別シート用）
function styleHeader_(sheet, numCols) {
  sheet.getRange(1, 1, 1, numCols)
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
  // 追加ログ: 各シートの最終行数を確認
  var ss = SpreadsheetApp.openById('1yAWUlasKNCL0KYXhnG1PWg8e3hepjIl_-VPhgNE2azQ');
  var sheets = ['nasa-tlx', 'sus'];
  sheets.forEach(function(name){
    var sh = ss.getSheetByName(name);
    if (sh) Logger.log(name + ' rows: ' + sh.getLastRow());
  });
}
