/***** Config *****/
const SPREADSHEET_ID = '1yAWUlasKNCL0KYXhnG1PWg8e3hepjIl_-VPhgNE2azQ';
const BASE_HEADERS    = ['UID', 'Task_State', 'Method', 'Group', 'Timestamp'];
const LOCK_TIMEOUT    = 30000;

/***** Entry *****/
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(LOCK_TIMEOUT);
  try {
    // 方式A: application/x-www-form-urlencoded 前提
    var uid        = (e.parameter.uid || '').trim();
    var task_state = (e.parameter.task_state || '').trim();
    var method     = (e.parameter.method || '').trim();
    var group      = (e.parameter.group || '').trim();
    var payloadStr = (e.parameter.payload || '').trim();

    if (!uid || !task_state || !method || !group || !payloadStr) {
      throw new Error('missing fields');
    }

    var data = JSON.parse(payloadStr); // payload は JSON 文字列で受け取る前提
    if (!data.results || typeof data.results !== 'object') {
      throw new Error('invalid payload');
    }

    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var timestamp = new Date().toISOString();

    for (var surveyId in data.results) {
      var surveyResults = data.results[surveyId]; // { q1: '...', ... }
      var sh = ss.getSheetByName(surveyId) || ss.insertSheet(surveyId);

      var headers = ensureWideHeaders_(sh, Object.keys(surveyResults));

      var row = new Array(headers.length).fill('');
      row[0] = uid;
      row[1] = task_state;
      row[2] = method;
      row[3] = group;
      row[4] = timestamp;

      for (var qid in surveyResults) {
        var idx = headers.indexOf(qid);
        if (idx === -1) {
          headers = ensureWideHeaders_(sh, [qid]);
          idx = headers.indexOf(qid);
          if (row.length < headers.length) row.length = headers.length;
        }
        var v = surveyResults[qid];
        row[idx] = (v !== null && typeof v === 'object') ? JSON.stringify(v) : String(v);
      }

      sh.getRange(sh.getLastRow() + 1, 1, 1, headers.length).setValues([row]);
    }

    return HtmlService.createHtmlOutput('<h2>送信完了</h2><p>ありがとうございました。</p>').setTitle('完了');

  } catch (err) {
    return HtmlService.createHtmlOutput('<h2>エラー</h2><pre>' + String(err) + '</pre>');
  } finally {
    try { lock.releaseLock(); } catch (_) {}
  }
}

/***** Helpers *****/
function ensureWideHeaders_(sheet, questionIds) {
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  var current = [];

  if (lastRow >= 1 && lastCol >= 1) {
    current = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  }

  if (current.length === 0) {
    var newHeaders = BASE_HEADERS.concat(questionIds);
    sheet.getRange(1, 1, 1, newHeaders.length).setValues([newHeaders]);
    styleHeader_(sheet, newHeaders.length);
    return newHeaders;
  }

  // 先頭にベース項目を揃える
  var normalized = BASE_HEADERS.concat(current.filter(function(h){ return BASE_HEADERS.indexOf(h) === -1; }));
  if (normalized.length !== current.length || normalized.some(function(h,i){ return h !== current[i]; })) {
    sheet.clearContents();
    sheet.getRange(1, 1, 1, normalized.length).setValues([normalized]);
    styleHeader_(sheet, normalized.length);
  }

  // 新しい質問IDを末尾に追加
  var appended = false;
  questionIds.forEach(function(q){
    if (normalized.indexOf(q) === -1) { normalized.push(q); appended = true; }
  });
  if (appended) {
    sheet.getRange(1, 1, 1, normalized.length).setValues([normalized]);
    styleHeader_(sheet, normalized.length);
  }

  return normalized;
}

function styleHeader_(sheet, numCols) {
  sheet.getRange(1, 1, 1, numCols)
       .setFontWeight('bold')
       .setBackground('#f0f0f0');
}