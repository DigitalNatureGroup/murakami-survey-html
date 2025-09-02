// 最終サーベイ：体験全体の振り返り
export const lastSurvey = {
    id: "last-survey",
    title: "最終アンケート",
    description: "本日のタスクを通じた全体的な体験について教えてください。",
    questions: [
      { id: "sec_intro", type: "section", title: "【導入と全体比較】", note: "全体の使いやすさや理由を教えてください。" },
      // 1. 導入と全体比較
      {
        id: "q1_best_method",
        type: "radio",
        label: "4つの手法（gLV→BO, CMA-ES, 標準BO, 手動）の中で、最も使いやすかったのはどれですか？",
        required: true,
        options: [
          { value: "glv-bo", label: "gLV→BO" },
          { value: "cma-es", label: "CMA-ES" },
          { value: "standard-bo", label: "標準BO" },
          { value: "manual", label: "手動" },
        ]
      },
      {
        id: "q2_worst_method",
        type: "radio",
        label: "逆に、最も使いにくいと感じたのはどれでしたか？",
        required: true,
        options: [
          { value: "glv-bo", label: "gLV→BO" },
          { value: "cma-es", label: "CMA-ES" },
          { value: "standard-bo", label: "標準BO" },
          { value: "manual", label: "手動" },
        ]
      },
      {
        id: "q3_reason",
        type: "text",
        label: "その理由を具体的に教えてください。",
        required: true
      },
  
      // 2. 探索プロセスと主体性
      { id: "sec_agency", type: "section", title: "【探索プロセスと主体性】", note: "どのように操作方針を決めたか、主体性の観点でうかがいます。" },
      {
        id: "q4_metaphor",
        type: "radio",
        label: "各手法は「カーナビ」か「探検隊」に例えるとどちらに近いと感じましたか？（代表的に1つ選んでください）",
        required: true,
        options: [
          { value: "nav", label: "カーナビ（案内してくれる）" },
          { value: "explorer", label: "探検隊（未知を探索する）" }
        ]
      },
      {
        id: "q5_glvbo_agency",
        type: "radio",
        label: "gLV→BOは「探検隊を導く手綱」としてうまく機能したと思いますか？",
        required: true,
        options: [
          { value: "worked", label: "うまく機能した" },
          { value: "neutral", label: "どちらともいえない" },
          { value: "not_worked", label: "システムに振り回された" }
        ]
      },
      {
        id: "q6_process",
        type: "text",
        label: "AIから提案を受けた後、どのように次の操作を決めましたか？思考のプロセスを教えてください。",
        required: true
      },
  
      // 3. 創造性と発見
      { id: "sec_creativity", type: "section", title: "【創造性と発見】", note: "発想の行き詰まりや新しい気づきについて。" },
      {
        id: "q7_fixation",
        type: "text",
        label: "タスク中に「行き詰まった」と感じた瞬間はありましたか？どの手法が助けになりましたか？",
        required: true
      },
      {
        id: "q8_creativity",
        type: "text",
        label: "AIの提案によって新しいアイデアが生まれた瞬間はありましたか？具体的に教えてください。",
        required: true
      },
  
      // 4. 信頼と協調
      { id: "sec_trust", type: "section", title: "【信頼と協調】", note: "AIへの信頼や協調感について。" },
      {
        id: "q9_trust_pos",
        type: "text",
        label: "AIの提案が「賢い」「役に立つ」と感じたのはどんな時でしたか？",
        required: true
      },
      {
        id: "q10_trust_neg",
        type: "text",
        label: "逆に「役に立たない」「意図を理解していない」と感じたのはどんな時でしたか？",
        required: true
      },
      {
        id: "q11_glvbo_trust",
        type: "radio",
        label: "gLV→BO のカオス的な振る舞いをどの程度信頼できましたか？",
        required: true,
        options: [
          { value: "high", label: "とても信頼できた" },
          { value: "medium", label: "ある程度信頼できた" },
          { value: "low", label: "あまり信頼できなかった" },
          { value: "none", label: "全く信頼できなかった" }
        ]
      },
  
      // 5. 改善提案
      { id: "sec_improve", type: "section", title: "5. 改善提案", note: "今後の改善に向けたご意見をお聞かせください。" },
      {
        id: "q12_improvement",
        type: "text",
        label: "このシステムに追加してほしい機能や、逆に簡素化してほしい部分があれば教えてください。",
        required: true
      }
    ]
  };