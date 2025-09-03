// 最終サーベイ：体験全体の振り返り
export const lastSurvey = {
    id: "last-survey",
    title: "最終アンケート",
    title_en: "Final Survey",
    description: "本日のタスクを通じた全体的な体験について教えてください。",
    description_en: "Please tell us about your overall experience through today's task.",
    questions: [
      { 
        id: "sec_intro", 
        type: "section", 
        title: "【導入と全体比較】", 
        title_en: "【Introduction and Overall Comparison】",
        note: "全体の使いやすさや理由を教えてください。",
        note_en: "Please tell us about the overall usability and reasons."
      },
      // 1. 導入と全体比較
      {
        id: "q1_best_method",
        type: "radio",
        label: "4つの手法（gLV→BO, CMA-ES, 標準BO, 手動）の中で、最も使いやすかったのはどれですか？",
        label_en: "Among the four methods (gLV→BO, CMA-ES, Standard BO, Manual), which was the most user-friendly?",
        required: true,
        options: [
          { value: "glv-bo", label: "gLV→BO", label_en: "gLV→BO" },
          { value: "cma-es", label: "CMA-ES", label_en: "CMA-ES" },
          { value: "standard-bo", label: "標準BO", label_en: "Standard BO" },
          { value: "manual", label: "手動", label_en: "Manual" },
        ]
      },
      {
        id: "q2_worst_method",
        type: "radio",
        label: "逆に、最も使いにくいと感じたのはどれでしたか？",
        label_en: "Conversely, which one did you find most difficult to use?",
        required: true,
        options: [
          { value: "glv-bo", label: "gLV→BO", label_en: "gLV→BO" },
          { value: "cma-es", label: "CMA-ES", label_en: "CMA-ES" },
          { value: "standard-bo", label: "標準BO", label_en: "Standard BO" },
          { value: "manual", label: "手動", label_en: "Manual" },
        ]
      },
      {
        id: "q3_reason",
        type: "text",
        label: "その理由を具体的に教えてください。",
        label_en: "Please tell us the specific reason.",
        required: true
      },
  
      // 2. 探索プロセスと主体性
      { 
        id: "sec_agency", 
        type: "section", 
        title: "【探索プロセスと主体性】", 
        title_en: "【Exploration Process and Agency】",
        note: "どのように操作方針を決めたか、主体性の観点でうかがいます。",
        note_en: "We will ask about how you decided on your operation policy from the perspective of agency."
      },
      {
        id: "q4_metaphor",
        type: "radio",
        label: "各手法は「カーナビ」か「探検隊」に例えるとどちらに近いと感じましたか？（代表的に1つ選んでください）",
        label_en: "If you compare each method to either a 'GPS navigation' or an 'exploration team', which did you feel was closer? (Please choose one representative example)",
        required: true,
        options: [
          { value: "nav", label: "カーナビ（案内してくれる）", label_en: "GPS navigation (guides you)" },
          { value: "explorer", label: "探検隊（未知を探索する）", label_en: "Exploration team (explores the unknown)" }
        ]
      },
      {
        id: "q5_glvbo_agency",
        type: "radio",
        label: "gLV→BOは「探検隊を導く手綱」としてうまく機能したと思いますか？",
        label_en: "Do you think gLV→BO functioned well as a 'rein to guide the exploration team'?",
        required: true,
        options: [
          { value: "worked", label: "うまく機能した", label_en: "It functioned well" },
          { value: "neutral", label: "どちらともいえない", label_en: "Neither agree nor disagree" },
          { value: "not_worked", label: "システムに振り回された", label_en: "I was controlled by the system" }
        ]
      },
      {
        id: "q6_process",
        type: "text",
        label: "AIから提案を受けた後、どのように次の操作を決めましたか？思考のプロセスを教えてください。",
        label_en: "After receiving suggestions from AI, how did you decide on the next operation? Please tell us about your thought process.",
        required: true
      },
  
      // 3. 創造性と発見
      { 
        id: "sec_creativity", 
        type: "section", 
        title: "【創造性と発見】", 
        title_en: "【Creativity and Discovery】",
        note: "発想の行き詰まりや新しい気づきについて。",
        note_en: "About creative blocks and new insights."
      },
      {
        id: "q7_fixation",
        type: "text",
        label: "タスク中に「行き詰まった」と感じた瞬間はありましたか？どの手法が助けになりましたか？",
        label_en: "Did you feel 'stuck' at any moment during the task? Which method was helpful?",
        required: true
      },
      {
        id: "q8_creativity",
        type: "text",
        label: "AIの提案によって新しいアイデアが生まれた瞬間はありましたか？具体的に教えてください。",
        label_en: "Was there a moment when new ideas were born from AI suggestions? Please tell us specifically.",
        required: true
      },
  
      // 4. 信頼と協調
      { 
        id: "sec_trust", 
        type: "section", 
        title: "【信頼と協調】", 
        title_en: "【Trust and Cooperation】",
        note: "AIへの信頼や協調感について。",
        note_en: "About trust in AI and sense of cooperation."
      },
      {
        id: "q9_trust_pos",
        type: "text",
        label: "AIの提案が「賢い」「役に立つ」と感じたのはどんな時でしたか？",
        label_en: "When did you feel that AI suggestions were 'smart' or 'useful'?",
        required: true
      },
      {
        id: "q10_trust_neg",
        type: "text",
        label: "逆に「役に立たない」「意図を理解していない」と感じたのはどんな時でしたか？",
        label_en: "Conversely, when did you feel that they were 'not useful' or 'did not understand the intention'?",
        required: true
      },
      {
        id: "q11_glvbo_trust",
        type: "radio",
        label: "gLV→BO のカオス的な振る舞いをどの程度信頼できましたか？",
        label_en: "To what extent could you trust the chaotic behavior of gLV→BO?",
        required: true,
        options: [
          { value: "high", label: "とても信頼できた", label_en: "I could trust it very much" },
          { value: "medium", label: "ある程度信頼できた", label_en: "I could trust it to some extent" },
          { value: "low", label: "あまり信頼できなかった", label_en: "I couldn't trust it much" },
          { value: "none", label: "全く信頼できなかった", label_en: "I couldn't trust it at all" }
        ]
      },
  
      // 5. 改善提案
      { 
        id: "sec_improve", 
        type: "section", 
        title: "5. 改善提案", 
        title_en: "5. Improvement Suggestions",
        note: "今後の改善に向けたご意見をお聞かせください。",
        note_en: "Please share your opinions for future improvements."
      },
      {
        id: "q12_improvement",
        type: "text",
        label: "このシステムに追加してほしい機能や、逆に簡素化してほしい部分があれば教えてください。",
        label_en: "Please tell us if there are any functions you would like added to this system, or parts you would like simplified.",
        required: true
      }
    ]
  };