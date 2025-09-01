/**
 * セットアップとテスト用スクリプト
 * 新しいパイプラインベースの仕組みに対応
 */

/**
 * スプレッドシートの初期化
 * @return {Object} 初期化結果
 */
function initializeSpreadsheet() {
  try {
    console.log('スプレッドシートの初期化を開始します...');
    
    const result = initializeSpreadsheet();
    
    if (result.ok) {
      console.log('✅ スプレッドシートの初期化が完了しました');
      console.log(`シート名: ${result.sheetName}`);
      console.log(`シートID: ${result.sheetId}`);
    } else {
      console.error('❌ スプレッドシートの初期化に失敗しました');
      console.error(`エラー: ${result.error}`);
    }
    
    return result;
    
  } catch (error) {
    console.error('❌ スプレッドシート初期化でエラーが発生しました:', error);
    return {
      ok: false,
      error: error.message
    };
  }
}

/**
 * システム全体のテスト
 * @return {Object} テスト結果
 */
function runSystemTest() {
  console.log('🚀 システム全体のテストを開始します...');
  
  const results = {
    timestamp: new Date().toISOString(),
    tests: {},
    overall: 'PENDING'
  };
  
  try {
    // 1. パイプライン設定のテスト
    console.log('1. パイプライン設定のテスト...');
    const pipelineTest = testPipelineConfigs();
    results.tests.pipeline = pipelineTest;
    
    // 2. スプレッドシート接続のテスト
    console.log('2. スプレッドシート接続のテスト...');
    const spreadsheetTest = testSpreadsheetConnection();
    results.tests.spreadsheet = spreadsheetTest;
    
    // 3. テンプレートファイルのテスト
    console.log('3. テンプレートファイルのテスト...');
    const templateTest = testTemplateFiles();
    results.tests.templates = templateTest;
    
    // 4. 設定値のテスト
    console.log('4. 設定値のテスト...');
    const configTest = testConfiguration();
    results.tests.configuration = configTest;
    
    // 全体結果の判定
    const allTestsPassed = Object.values(results.tests).every(test => test.status === 'PASS');
    results.overall = allTestsPassed ? 'PASS' : 'FAIL';
    
    console.log(`\n🎯 システムテスト完了: ${results.overall}`);
    console.log(`パイプライン: ${results.tests.pipeline.status}`);
    console.log(`スプレッドシート: ${results.tests.spreadsheet.status}`);
    console.log(`テンプレート: ${results.tests.templates.status}`);
    console.log(`設定: ${results.tests.configuration.status}`);
    
    return results;
    
  } catch (error) {
    console.error('❌ システムテストでエラーが発生しました:', error);
    results.overall = 'ERROR';
    results.error = error.message;
    return results;
  }
}

/**
 * パイプライン設定のテスト
 * @return {Object} テスト結果
 */
function testPipelineConfigs() {
  try {
    const testSessions = ['default', 'EXPERIMENT_A', 'EXPERIMENT_B'];
    const results = [];
    
    for (const session of testSessions) {
      const pipeline = getCustomPipeline(session);
      const validation = validatePipeline(pipeline);
      
      results.push({
        session: session,
        pipeline: pipeline,
        validation: validation,
        valid: validation.valid
      });
    }
    
    const allValid = results.every(r => r.valid);
    
    return {
      status: allValid ? 'PASS' : 'FAIL',
      message: allValid ? 'すべてのパイプライン設定が有効です' : '一部のパイプライン設定に問題があります',
      details: results
    };
    
  } catch (error) {
    return {
      status: 'ERROR',
      message: `パイプライン設定のテストでエラーが発生: ${error.message}`,
      error: error
    };
  }
}

/**
 * スプレッドシート接続のテスト
 * @return {Object} テスト結果
 */
function testSpreadsheetConnection() {
  try {
    const sheetId = getSpreadsheetConfig('SHEET_ID');
    
    if (!sheetId || sheetId === '1yAWUlasKNCL0KYXhnG1PWg8e3hepjIl_-VPhgNE2azQ') {
      return {
        status: 'SKIP',
        message: 'スプレッドシートIDが設定されていません',
        details: 'setSpreadsheetId()関数でIDを設定してください'
      };
    }
    
    // スプレッドシートへの接続をテスト
    const ss = SpreadsheetApp.openById(sheetId);
    if (!ss) {
      return {
        status: 'FAIL',
        message: 'スプレッドシートが見つかりません',
        details: 'スプレッドシートIDを確認してください'
      };
    }
    
    // シート名を取得してテスト
    const sheetNames = ss.getSheets().map(sheet => sheet.getName());
    
    return {
      status: 'PASS',
      message: 'スプレッドシートに正常に接続できました',
      details: {
        sheetId: sheetId,
        sheetCount: ss.getSheets().length,
        sheetNames: sheetNames
      }
    };
    
  } catch (error) {
    return {
      status: 'ERROR',
      message: 'スプレッドシート接続テストでエラーが発生しました',
      error: error.message,
      details: '権限やスプレッドシートIDを確認してください'
    };
  }
}

/**
 * テンプレートファイルのテスト
 * @return {Object} テスト結果
 */
function testTemplateFiles() {
  try {
    const requiredTemplates = [
      '_layout',
      'task_intro',
      'task_transition',
      'form_nasa_tlx',
      'form_sus',
      'final_submit',
      'done'
    ];
    
    const results = [];
    
    for (const template of requiredTemplates) {
      try {
        const content = HtmlService.createHtmlOutputFromFile(`ui/${template}`).getContent();
        const hasContent = content && content.trim().length > 0;
        
        results.push({
          template: template,
          status: hasContent ? 'PASS' : 'FAIL',
          message: hasContent ? 'テンプレートが正常に読み込めます' : 'テンプレートの内容が空です',
          contentLength: content ? content.length : 0
        });
      } catch (error) {
        results.push({
          template: template,
          status: 'ERROR',
          message: `テンプレートの読み込みに失敗: ${error.message}`,
          error: error.message
        });
      }
    }
    
    const allPassed = results.every(r => r.status === 'PASS');
    
    return {
      status: allPassed ? 'PASS' : 'FAIL',
      message: allPassed ? 'すべてのテンプレートファイルが正常に読み込めます' : '一部のテンプレートファイルに問題があります',
      details: results
    };
    
  } catch (error) {
    return {
      status: 'ERROR',
      message: `テンプレートファイルのテストでエラーが発生: ${error.message}`,
      error: error
    };
  }
}

/**
 * 設定値のテスト
 * @return {Object} テスト結果
 */
function testConfiguration() {
  try {
    const results = [];
    
    // 1. スプレッドシートIDの設定確認
    const sheetId = getSpreadsheetConfig('SHEET_ID');
    const sheetIdValid = sheetId && sheetId !== '1yAWUlasKNCL0KYXhnG1PWg8e3hepjIl_-VPhgNE2azQ' && sheetId.length > 20;
    
    results.push({
      item: 'SHEET_ID',
      status: sheetIdValid ? 'PASS' : 'FAIL',
      message: sheetIdValid ? 'スプレッドシートIDが正しく設定されています' : 'スプレッドシートIDが設定されていません',
      value: sheetIdValid ? '***' : sheetId
    });
    
    // 2. その他の設定値の確認
    const otherConfigs = [
      'SHEET_NAME',
      'TIMEZONE',
      'MAX_SESSION_DURATION'
    ];
    
    for (const configKey of otherConfigs) {
      let value = null;
      let category = 'spreadsheet';
      
      if (configKey === 'TIMEZONE' || configKey === 'MAX_SESSION_DURATION') {
        category = 'app';
        value = getAppConfig(configKey);
      } else {
        value = getSpreadsheetConfig(configKey);
      }
      
      const isValid = value !== null;
      
      results.push({
        item: configKey,
        status: isValid ? 'PASS' : 'WARN',
        message: isValid ? `${configKey}が設定されています` : `${configKey}は設定されていません（オプション）`,
        value: value
      });
    }
    
    const criticalPassed = results.filter(r => r.item === 'SHEET_ID').every(r => r.status === 'PASS');
    const overallStatus = criticalPassed ? 'PASS' : 'FAIL';
    
    return {
      status: overallStatus,
      message: criticalPassed ? '重要な設定値が正しく設定されています' : '重要な設定値に問題があります',
      details: results
    };
    
  } catch (error) {
    return {
      status: 'ERROR',
      message: `設定値のテストでエラーが発生: ${error.message}`,
      error: error
    };
  }
}

/**
 * テストデータのクリーンアップ
 * @param {string} uid - ユーザーID
 * @param {string} session - セッションID
 */
function cleanupTestData(uid, session) {
  try {
    // テストデータを削除（実際の実装では適切な削除処理を行う）
    console.log(`テストデータをクリア: UID=${uid}, Session=${session}`);
    
    // 進捗情報のクリア
    const properties = PropertiesService.getScriptProperties();
    const key = `progress_${uid}_${session}`;
    properties.deleteProperty(key);
    
    console.log('テストデータのクリーンアップが完了しました');
    
  } catch (error) {
    console.warn('テストデータのクリーンアップに失敗:', error);
  }
}

/**
 * システム情報の表示
 * @return {Object} システム情報
 */
function showSystemInfo() {
  try {
    const info = {
      timestamp: new Date().toISOString(),
      version: '2.0.0',
      architecture: 'Pipeline-based Survey System',
      features: [
        'Multi-step survey pipeline',
        'Dynamic template loading',
        'Progress tracking',
        'Data validation',
        'Error handling',
        'Responsive UI'
      ],
      configuration: {
        sheetId: getSpreadsheetConfig('SHEET_ID'),
        sheetName: getSpreadsheetConfig('SHEET_NAME'),
        timezone: getAppConfig('TIMEZONE')
      },
      pipelines: {
        default: getPipeline('default').length + ' steps',
        experimentA: getCustomPipeline('EXPERIMENT_A').length + ' steps',
        experimentB: getCustomPipeline('EXPERIMENT_B').length + ' steps'
      },
      templates: [
        '_layout.html',
        'task_intro.html',
        'task_transition.html',
        'form_nasa_tlx.html',
        'form_sus.html',
        'final_submit.html',
        'done.html'
      ]
    };
    
    console.log('📊 システム情報:');
    console.log(JSON.stringify(info, null, 2));
    
    return info;
    
  } catch (error) {
    console.error('システム情報の取得に失敗:', error);
    return {
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * 設定の初期化
 * @return {Object} 初期化結果
 */
function initializeConfiguration() {
  try {
    console.log('設定の初期化を開始します...');
    
    console.log('設定の初期化を開始します...');
    
    // 設定は既にconfig.gsで定義されているため、初期化は不要
    const validation = validateConfig();
    
    if (validation.valid) {
      console.log('✅ 設定の初期化が完了しました: SUCCESS');
      return {
        status: 'SUCCESS',
        message: '設定が正しく初期化されています',
        details: validation
      };
    } else {
      console.log('⚠️ 設定の初期化に問題があります: PARTIAL');
      return {
        status: 'PARTIAL',
        message: '一部の設定に問題があります',
        details: validation
      };
    }
    
  } catch (error) {
    console.error('❌ 設定の初期化でエラーが発生しました:', error);
    return {
      status: 'ERROR',
      error: error.message
    };
  }
}

/**
 * 軽量システムテスト（スプレッドシート機能なし）
 * 権限問題のデバッグ用
 * @return {Object} テスト結果
 */
function runLightweightTest() {
  console.log('🚀 軽量システムテストを開始します...');
  
  const results = {
    timestamp: new Date().toISOString(),
    tests: {},
    overall: 'PENDING'
  };
  
  try {
    // 1. パイプライン設定のテスト
    console.log('1. パイプライン設定のテスト...');
    const pipelineTest = testPipelineConfigs();
    results.tests.pipeline = pipelineTest;
    
    // 2. テンプレートファイルのテスト
    console.log('2. テンプレートファイルのテスト...');
    const templateTest = testTemplateFiles();
    results.tests.templates = templateTest;
    
    // 3. 設定値のテスト
    console.log('3. 設定値のテスト...');
    const configTest = testConfiguration();
    results.tests.configuration = configTest;
    
    // 4. 基本関数のテスト
    console.log('4. 基本関数のテスト...');
    const functionTest = testBasicFunctions();
    results.tests.functions = functionTest;
    
    // 全体結果の判定
    const allTestsPassed = Object.values(results.tests).every(test => test.status === 'PASS');
    results.overall = allTestsPassed ? 'PASS' : 'FAIL';
    
    console.log(`\n🎯 軽量システムテスト完了: ${results.overall}`);
    console.log(`パイプライン: ${results.tests.pipeline.status}`);
    console.log(`テンプレート: ${results.tests.templates.status}`);
    console.log(`設定: ${results.tests.configuration.status}`);
    console.log(`基本関数: ${results.tests.functions.status}`);
    
    return results;
    
  } catch (error) {
    console.error('❌ 軽量システムテストでエラーが発生しました:', error);
    results.overall = 'ERROR';
    results.error = error.message;
    return results;
  }
}

/**
 * 基本関数のテスト
 * @return {Object} テスト結果
 */
function testBasicFunctions() {
  try {
    const results = [];
    
    // アンケート設定の取得テスト
    try {
      const nasaConfig = getSurveyConfig('nasa-tlx');
      if (nasaConfig && nasaConfig.name) {
        results.push({ test: 'getSurveyConfig(nasa-tlx)', status: 'PASS' });
      } else {
        results.push({ test: 'getSurveyConfig(nasa-tlx)', status: 'FAIL', error: '設定が見つからない' });
      }
    } catch (error) {
      results.push({ test: 'getSurveyConfig(nasa-tlx)', status: 'ERROR', error: error.message });
    }
    
    // メソッドマッピングのテスト
    try {
      const surveyType = getSurveyTypeByMethod('X');
      if (surveyType === 'nasa-tlx') {
        results.push({ test: 'getSurveyTypeByMethod(X)', status: 'PASS' });
      } else {
        results.push({ test: 'getSurveyTypeByMethod(X)', status: 'FAIL', error: `期待値: nasa-tlx, 実際: ${surveyType}` });
      }
    } catch (error) {
      results.push({ test: 'getSurveyTypeByMethod(X)', status: 'ERROR', error: error.message });
    }
    
    // パイプラインのテスト
    try {
      const pipeline = getCustomPipeline('default');
      if (Array.isArray(pipeline) && pipeline.length > 0) {
        results.push({ test: 'getCustomPipeline(default)', status: 'PASS', count: pipeline.length });
      } else {
        results.push({ test: 'getCustomPipeline(default)', status: 'FAIL', error: 'パイプラインが空または無効' });
      }
    } catch (error) {
      results.push({ test: 'getCustomPipeline(default)', status: 'ERROR', error: error.message });
    }
    
    const allPassed = results.every(r => r.status === 'PASS');
    
    return {
      status: allPassed ? 'PASS' : 'FAIL',
      results: results,
      passed: results.filter(r => r.status === 'PASS').length,
      total: results.length
    };
    
  } catch (error) {
    return {
      status: 'ERROR',
      error: error.message
    };
  }
}
