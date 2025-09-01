// アンケート設定
const SURVEY_CONFIGS = {
  'nasa': {
    name: 'NASA-TLX 芳賀版 作業負荷評価フォーム',
    template: 'nasa-tlx', // 専用テンプレート名
    fields: [
      {id: 'mental', label: '精神的要求 (Mental Demand)', type: 'range', desc: 'どの程度の知的・知覚的活動（考える、決める、計算する、記憶する，見るなど）を必要としましたか.課題はやさしかったですか難しかったですか. 単純でしたか複雑でしたか,正確さが求められましたか, 大ざっぱでよかったですか.'},
      {id: 'physical', label: '身体的要求 (Physical Demand)', type: 'range', desc: 'どの程度の身体的活動（押す、引く、回す、制倒する、動き回るなど）を必要としましたか.作業はラクでしたかキツかったですか、ゆっくりできましたかキビキビやらなければなりませんでしたか、休み休みできましたか働きづめでしたか.'},
      {id: 'temporal', label: '時間的要求 (Temporal Demand)', type: 'range', desc: '仕事のペースや課題が発生する頻度のために感じる時間的切迫感はどの程度でしたか. ペースはゆっくりとして余裕があるものでしたか, それとも速くて余裕のないものでしたか.'},
      {id: 'performance', label: '作業成績 (Performance)', type: 'range', desc: '作業指示者（またはあなた自身）によって設定された課題の目標をどの程度達成できたと思いますか. 目標の達成に関して自分の作業成績にどの程度満足していますか.'},
      {id: 'effort', label: '努力 (Effort)', type: 'range', desc: '作業成績のレベルを達成・維持するために, 精神的・身体的にどの程度いっしょうけんめいに作業しなけれはなりませんでしたか.'},
      {id: 'frustration', label: '欲求不満 (Frustration)', type: 'range', desc: '作業中に、不安感、落胆、いらいら、ストレス、悩みをどの程度感じましたか. あるいは逆に、安心感、満足感、充足感、楽しさ、リラックスをどの程度感じましたか.'},
      {id: 'overall', label: '全体的負荷 (Overall Workload)', type: 'range', desc: 'さまざまな負荷要因，負荷原因. 部分部分の課題内容を総合すると、全体としてどの程度の作業負担を感じましたか.'}
    ],
    anchors: {
      'mental': ['小さい', '大きい'],
      'physical': ['小さい', '大きい'],
      'temporal': ['短い', '長い'],
      'performance': ['良い', '悪い'],
      'effort': ['少ない', '多い'],
      'frustration': ['低い', '高い'],
      'overall': ['低い', '高い']
    }
  },
  'likert-scale': {
    name: 'リッカート尺度アンケート',
    template: 'likert-scale', // 専用テンプレート名
    fields: [
      {id: 'q1', label: '質問1', type: 'likert', desc: 'このシステムは使いやすいと思いますか？'},
      {id: 'q2', label: '質問2', type: 'likert', desc: 'このシステムの機能は十分だと思いますか？'},
      {id: 'q3', label: '質問3', type: 'text', desc: '自由回答をお聞かせください'}
    ],
    likertOptions: ['全くそう思わない', 'そう思わない', 'どちらでもない', 'そう思う', 'とてもそう思う']
  },
  'custom-survey': {
    name: 'カスタムアンケート',
    template: 'custom-survey', // 専用テンプレート名
    fields: [
      {id: 'rating', label: '評価', type: 'rating', desc: '星評価をお願いします'},
      {id: 'comment', label: 'コメント', type: 'textarea', desc: '詳細なコメントをお聞かせください'}
    ]
  },
  'sus': {
    name: 'SUS システム使用性尺度',
    template: 'sus',
    fields: [
      {id: 'q1', label: 'このシステムを頻繁に使いたいと思う', type: 'likert'},
      {id: 'q2', label: 'このシステムは複雑すぎると思う', type: 'likert'},
      {id: 'q3', label: 'このシステムは使いやすいと思う', type: 'likert'},
      {id: 'q4', label: 'このシステムを使うには技術サポートが必要だと思う', type: 'likert'},
      {id: 'q5', label: 'このシステムの機能はよく統合されていると思う', type: 'likert'},
      {id: 'q6', label: 'このシステムには矛盾が多すぎると思う', type: 'likert'},
      {id: 'q7', label: 'ほとんどの人がこのシステムをすぐに使えるようになると思う', type: 'likert'},
      {id: 'q8', label: 'このシステムは非常に扱いにくいと思う', type: 'likert'},
      {id: 'q9', label: 'このシステムを使うことに自信を感じた', type: 'likert'},
      {id: 'q10', label: 'このシステムを使う前に覚えることがたくさんあると思う', type: 'likert'}
    ]
  }
  // 今後追加するアンケートはここに追加
};

// メソッドとアンケートタイプのマッピング
const METHOD_SURVEY_MAP = {
  'X': 'nasa',
  'Y': 'sus',
  'Z': 'custom-survey',
  // 今後追加するメソッドはここに追加
};

/**
 * アンケート設定を取得
 * @param {string} surveyType - アンケートタイプ
 * @return {Object} アンケート設定
 */
function getSurveyConfig(surveyType) {
  return SURVEY_CONFIGS[surveyType] || null;
}

/**
 * メソッドからアンケートタイプを取得
 * @param {string} method - メソッド
 * @return {string} アンケートタイプ
 */
function getSurveyTypeByMethod(method) {
  return METHOD_SURVEY_MAP[method] || null;
}

/**
 * 利用可能なアンケートタイプの一覧を取得
 * @return {Array} アンケートタイプの配列
 */
function getAvailableSurveyTypes() {
  return Object.keys(SURVEY_CONFIGS);
}

/**
 * 利用可能なメソッドの一覧を取得
 * @return {Array} メソッドの配列
 */
function getAvailableMethods() {
  return Object.keys(METHOD_SURVEY_MAP);
}

/**
 * アンケート設定の検証
 * @param {string} surveyType - アンケートタイプ
 * @return {boolean} 有効かどうか
 */
function validateSurveyConfig(surveyType) {
  const config = SURVEY_CONFIGS[surveyType];
  if (!config) return false;
  
  // 必須フィールドのチェック
  if (!config.name || !config.fields || !Array.isArray(config.fields)) {
    return false;
  }
  
  // フィールドの検証
  for (const field of config.fields) {
    if (!field.id || !field.label || !field.type) {
      return false;
    }
  }
  
  return true;
}
