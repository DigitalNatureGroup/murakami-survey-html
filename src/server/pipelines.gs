/**
 * パイプライン管理
 * セッション別のステップ定義と進行管理
 */

/**
 * セッション別のパイプラインを取得
 * @param {string} session - セッションID
 * @return {Array} ステップ定義の配列
 */
function getPipeline(session) {
  // セッション別に配列を出し分けてもOK
  // 現在は共通のパイプラインを使用
  return [
    { id: 'intro',      kind: 'task', tpl: 'task_intro', name: '実験のご案内' },
    { id: 'nasa',       kind: 'form', tpl: 'form_nasa_tlx', name: 'NASA-TLX 作業負荷評価' },
    { id: 'transition', kind: 'task', tpl: 'task_transition', name: '次のアンケートへ' },
    { id: 'sus',        kind: 'form', tpl: 'form_sus', name: 'SUS システム使用性尺度' },
    { id: 'final',      kind: 'final', tpl: 'final_submit', name: '送信確認' },
    { id: 'done',       kind: 'done',  tpl: 'done', name: '完了' }
  ];
}

/**
 * 特定のセッション用のカスタムパイプラインを取得
 * @param {string} session - セッションID
 * @return {Array} カスタムステップ定義の配列
 */
function getCustomPipeline(session) {
  // セッション固有のパイプラインが必要な場合はここで分岐
  // 例：特定の実験条件に応じて異なるアンケート順序を設定
  
  if (session.includes('EXPERIMENT_A')) {
    return [
      { id: 'intro',      kind: 'task', tpl: 'task_intro', name: '実験Aのご案内' },
      { id: 'nasa',       kind: 'form', tpl: 'form_nasa_tlx', name: 'NASA-TLX 作業負荷評価' },
      { id: 'final',      kind: 'final', tpl: 'final_submit', name: '送信確認' },
      { id: 'done',       kind: 'done',  tpl: 'done', name: '完了' }
    ];
  }
  
  if (session.includes('EXPERIMENT_B')) {
    return [
      { id: 'intro',      kind: 'task', tpl: 'task_intro', name: '実験Bのご案内' },
      { id: 'sus',        kind: 'form', tpl: 'form_sus', name: 'SUS システム使用性尺度' },
      { id: 'nasa',       kind: 'form', tpl: 'form_nasa_tlx', name: 'NASA-TLX 作業負荷評価' },
      { id: 'final',      kind: 'final', tpl: 'final_submit', name: '送信確認' },
      { id: 'done',       kind: 'done',  tpl: 'done', name: '完了' }
    ];
  }
  
  // デフォルトパイプライン
  return getPipeline(session);
}

/**
 * ステップの検証
 * @param {Object} step - ステップ定義
 * @return {boolean} 有効かどうか
 */
function validateStep(step) {
  if (!step || !step.id || !step.kind || !step.tpl) {
    return false;
  }
  
  const validKinds = ['task', 'form', 'final', 'done'];
  if (!validKinds.includes(step.kind)) {
    return false;
  }
  
  return true;
}

/**
 * パイプライン全体の検証
 * @param {Array} pipeline - パイプライン配列
 * @return {Object} 検証結果
 */
function validatePipeline(pipeline) {
  if (!Array.isArray(pipeline) || pipeline.length === 0) {
    return { valid: false, error: 'パイプラインが空または無効です' };
  }
  
  const errors = [];
  for (let i = 0; i < pipeline.length; i++) {
    const step = pipeline[i];
    if (!validateStep(step)) {
      errors.push(`ステップ${i}: 無効なステップ定義`);
    }
  }
  
  // 最後のステップは必ず 'done' である必要がある
  const lastStep = pipeline[pipeline.length - 1];
  if (lastStep.kind !== 'done') {
    errors.push('最後のステップは完了（done）である必要があります');
  }
  
  // 'final' ステップは 'done' の直前である必要がある
  const finalStepIndex = pipeline.findIndex(step => step.kind === 'final');
  if (finalStepIndex !== -1 && finalStepIndex !== pipeline.length - 2) {
    errors.push('送信確認（final）ステップは完了（done）の直前である必要があります');
  }
  
  return {
    valid: errors.length === 0,
    errors: errors
  };
}
