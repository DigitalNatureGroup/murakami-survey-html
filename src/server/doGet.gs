/**
 * Webアプリのエントリーポイント
 * 新しいパイプラインベースの仕組みに対応
 */

/**
 * GETリクエストの処理
 * @param {Object} e - イベントオブジェクト
 * @return {HtmlOutput} HTML出力
 */
function doGet(e) {
  try {
    console.log('doGet開始 - パラメータ:', JSON.stringify(e.parameter));
    
    // URLパラメータの取得と検証
    const validation = validateUrlParameters(e.parameter);
    console.log('パラメータ検証結果:', JSON.stringify(validation));
    
    if (!validation.valid) {
      console.error('パラメータ検証エラー:', validation.errors);
      return createErrorPage('パラメータエラー', validation.errors.join('<br>'));
    }
    
    const { uid, session, idx } = validation;
    console.log('検証済みパラメータ:', { uid, session, idx });
    
    // パイプラインの取得
    const pipeline = getCustomPipeline(session);
    console.log('パイプライン取得完了:', JSON.stringify(pipeline));
    
    const pipelineValidation = validatePipeline(pipeline);
    console.log('パイプライン検証結果:', JSON.stringify(pipelineValidation));
    
    if (!pipelineValidation.valid) {
      console.error('パイプライン検証エラー:', pipelineValidation.errors);
      logMessage('ERROR', 'パイプライン検証エラー', pipelineValidation.errors);
      return createErrorPage('システムエラー', 'パイプラインの設定に問題があります');
    }
    
    // インデックスの範囲チェック
    if (idx < 0 || idx >= pipeline.length) {
      // 範囲外の場合は最後のステップにリダイレクト
      const finalIdx = pipeline.length - 1;
      const redirectUrl = `?uid=${encodeURIComponent(uid)}&session=${encodeURIComponent(session)}&idx=${finalIdx}`;
      return HtmlService.createHtmlOutput(`
        <script>
          window.location.replace('${redirectUrl}');
        </script>
        <p>リダイレクト中...</p>
      `);
    }
    
    // 現在のステップを取得
    const step = pipeline[idx];
    console.log('現在のステップ:', JSON.stringify(step));
    
    // 進捗情報を取得（復帰用）
    const progress = getProgress(uid, session);
    console.log('進捗情報:', JSON.stringify(progress));
    
    // レイアウトテンプレートを作成
    console.log('レイアウトテンプレート作成開始');
    const layout = HtmlService.createTemplateFromFile('ui/_layout');
    console.log('レイアウトテンプレート作成完了');
    
    // すべてのテンプレートで使う共通のデータオブジェクトを作成
    const templateData = {
      uid: uid,
      session: session,
      idx: idx,
      step: step,
      pipeline: pipeline,
      progress: progress,
      userAgent: e.parameter.userAgent || ''
    };

    // もし現在のステップが 'form' なら、そのフォーム用の追加設定を読み込む
    if (step.kind === 'form') {
      console.log('フォームステップの設定を読み込み:', step.id);
      const surveyConfig = getSurveyConfig(step.id); // 'nasa' や 'sus' などのIDを渡す
      if (surveyConfig) {
        templateData.surveyConfig = surveyConfig;
        console.log('surveyConfig設定完了:', surveyConfig.name);
      } else {
        console.warn('surveyConfig が見つかりません:', step.id);
        // フォールバック用の基本設定
        templateData.surveyConfig = {
          name: step.name || 'Survey',
          fields: []
        };
      }
      
      // 'method' パラメータも必要ならここで設定
      templateData.method = e.parameter.method || 'default';
    }

    // 作成したデータオブジェクトを丸ごとレイアウトテンプレートに渡す
    layout.data = templateData;
    
    // 従来の方法でも変数を設定（互換性のため）
    layout.uid = uid;
    layout.session = session;
    layout.idx = idx;
    layout.step = step;
    layout.pipeline = pipeline;
    layout.progress = progress;
    layout.userAgent = e.parameter.userAgent || '';
    
    // レイアウトを評価してHTML出力を作成
    console.log('HTML出力作成開始');
    const htmlOutput = layout.evaluate()
      .setTitle(step.name || 'Survey')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    console.log('HTML出力作成完了');
    
    // ログ出力
    logMessage('INFO', 'ページ表示', {
      uid: uid,
      session: session,
      idx: idx,
      stepId: step.id,
      stepKind: step.kind
    });
    
    console.log('doGet正常完了');
    return htmlOutput;
    
  } catch (error) {
    console.error('doGet処理エラー:', error);
    console.error('エラースタック:', error.stack);
    console.error('エラー発生時のパラメータ:', JSON.stringify(e.parameter));
    
    logMessage('ERROR', 'doGet処理エラー', {
      message: error.message,
      stack: error.stack,
      parameters: e.parameter,
      timestamp: new Date().toISOString()
    });
    
    // エラーの詳細をHTMLに含める（デバッグ用）
    const errorDetails = `
      <h3>エラー詳細:</h3>
      <p><strong>メッセージ:</strong> ${error.message}</p>
      <p><strong>パラメータ:</strong> ${JSON.stringify(e.parameter)}</p>
      <p><strong>時刻:</strong> ${new Date().toISOString()}</p>
    `;
    
    return createErrorPage('システムエラー', `予期しないエラーが発生しました: ${error.message}${errorDetails}`);
  }
}

/**
 * エラーページの作成
 * @param {string} title - エラータイトル
 * @param {string} message - エラーメッセージ
 * @return {HtmlOutput} エラーページのHTML出力
 */
function createErrorPage(title, message) {
  const errorHtml = `
    <!DOCTYPE html>
    <html lang="ja">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>エラー - ${title}</title>
      <style>
        body { 
          font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; 
          margin: 24px; 
          line-height: 1.6;
          color: #333;
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 20px;
          border: 1px solid #e74c3c;
          border-radius: 8px;
          background-color: #fdf2f2;
        }
        .error-icon { 
          font-size: 48px; 
          color: #e74c3c; 
          text-align: center;
          margin-bottom: 20px;
        }
        h1 { 
          color: #e74c3c; 
          margin-top: 0;
          text-align: center;
        }
        .error-message { 
          background: white; 
          padding: 15px; 
          border-radius: 4px; 
          border-left: 4px solid #e74c3c;
        }
        .back-link { 
          margin-top: 20px; 
          text-align: center;
        }
        .back-link a { 
          color: #3498db; 
          text-decoration: none;
        }
        .back-link a:hover { 
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="error-icon">⚠️</div>
        <h1>${title}</h1>
        <div class="error-message">
          ${message}
        </div>
        <div class="back-link">
          <a href="javascript:history.back()">← 前のページに戻る</a>
        </div>
      </div>
    </body>
    </html>
  `;
  
  return HtmlService.createHtmlOutput(errorHtml);
}

/**
 * テンプレート読み込みヘルパー（修正版）
 * _layout.html から呼び出される
 * @param {string} filename - テンプレートファイル名
 * @param {Object} data - テンプレートに渡すデータオブジェクト
 * @return {string} テンプレートのHTML内容
 */
function include_(filename, data) {
  try {
    console.log(`テンプレート読み込み開始: ${filename}`);
    const template = HtmlService.createTemplateFromFile('ui/' + filename);
    
    // 受け取ったデータをテンプレートオブジェクトにコピー
    if (data) {
      Object.keys(data).forEach(key => {
        template[key] = data[key];
      });
      console.log(`テンプレートデータ設定完了: ${Object.keys(data).join(', ')}`);
    }
    
    // テンプレートを評価してHTML文字列を返す
    const content = template.evaluate().getContent();
    console.log(`テンプレート読み込み成功: ${filename} (${content.length} 文字)`);
    return content;

  } catch (error) {
    console.error(`テンプレート読み込みエラー: ${filename}`, error);
    logMessage('ERROR', `テンプレート読み込みエラー: ${filename}`, {
      message: error.message,
      stack: error.stack,
      filename: filename,
      fullPath: 'ui/' + filename
    });
    return `<div class="error">
      <h3>テンプレート読み込みエラー</h3>
      <p>ファイル: ${filename}</p>
      <p>エラー: ${error.message}</p>
    </div>`;
  }
}

/**
 * 回答保存API（クライアントから呼び出される）
 * @param {string} uid - ユーザーID
 * @param {string} session - セッションID
 * @param {string} stepId - ステップID
 * @param {number} idx - インデックス
 * @param {string} answersJson - 回答データ（JSON文字列）
 * @param {string} userAgent - ユーザーエージェント
 * @return {Object} 保存結果
 */
function saveAnswersApi(uid, session, stepId, idx, answersJson, userAgent) {
  try {
    console.log('saveAnswersApi呼び出し:', { uid, session, stepId, idx, userAgent });
    
    // JSON文字列を解析
    let answers = {};
    try {
      answers = JSON.parse(answersJson || '{}');
    } catch (e) {
      console.warn('回答データの解析エラー:', e);
      answers = {};
    }
    
    // payloadオブジェクトを再構築
    const payload = {
      uid: String(uid || ''),
      session: String(session || ''),
      stepId: String(stepId || ''),
      idx: Number(idx || 0),
      answers: sanitizeData(answers),
      userAgent: String(userAgent || 'Unknown')
    };
    
    console.log('再構築されたpayload:', payload);
    
    // storage.gsのsaveAnswers関数を呼び出し（無限再帰を回避）
    const result = saveAnswers(payload);
    
    // ログ出力
    logMessage('INFO', '回答保存', {
      uid: payload.uid,
      session: payload.session,
      stepId: payload.stepId,
      idx: payload.idx,
      success: result.ok
    });
    
    return result;
    
  } catch (error) {
    console.error('saveAnswersApiエラー:', error);
    logMessage('ERROR', '回答保存エラー', error);
    return createErrorResponse('回答の保存に失敗しました', 500);
  }
}

/**
 * セッション情報の取得（クライアントから呼び出される）
 * @param {string} uid - ユーザーID
 * @param {string} session - セッションID
 * @return {Object} セッション情報
 */
function getSessionInfo(uid, session) {
  try {
    const progress = getProgress(uid, session);
    const completion = checkSessionCompletion(uid, session);
    const history = getResponseHistory(uid, session);
    
    return createSuccessResponse({
      progress: progress,
      completion: completion,
      history: history
    }, 'セッション情報を取得しました');
    
  } catch (error) {
    logMessage('ERROR', 'セッション情報取得エラー', error);
    return createErrorResponse('セッション情報の取得に失敗しました', 500);
  }
}
