// オリジナル調査アンケート
export const originalSurvey = {
    id: "original",
    title: "Agency / Trust / 責任感・自由記述",
    description: "以下の設問にお答えください。",
    questions: [
        // Agency（5件法）
        { id: "agency_1", type: "radio", ui: "likert", required: true, label: "1.私は、自分の行動を完全にコントロールできていると感じました。",
          options: [1,2,3,4,5].map(v => ({ value: String(v), label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1] })) },
        { id: "agency_2", type: "radio", ui: "likert", required: true, label: "2.私は、システムに振り回されていると感じました。（逆転）",
          options: [1,2,3,4,5].map(v => ({ value: String(v), label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1] })) },
        { id: "agency_3", type: "radio", ui: "likert", required: true, label: "3.私の行動の結果が、意図した通りに論理的に繋がっていると感じられませんでした。（逆転）",
          options: [1,2,3,4,5].map(v => ({ value: String(v), label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1] })) },
        { id: "agency_4", type: "radio", ui: "likert", required: true, label: "4.私は、デザイン空間の異なる領域を探索する上で、システムをコントロールできていると感じました。",
          options: [1,2,3,4,5].map(v => ({ value: String(v), label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1] })) },
        { id: "agency_5", type: "radio", ui: "likert", required: true, label: "5.このシステムを使用することで、デザインの出力に対する各デザインパラメータの影響を把握できました。",
          options: [1,2,3,4,5].map(v => ({ value: String(v), label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1] })) },
        { id: "agency_6", type: "radio", ui: "likert", required: true, label: "6.このシステムを使用することで、デザイン空間について直感的に理解できました。",
          options: [1,2,3,4,5].map(v => ({ value: String(v), label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1] })) },
        { id: "agency_7", type: "radio", ui: "likert", required: true, label: "7.AIからの提案があった後でも、私は自分のデザインの意図に沿って評価を行っていると感じました。",
          options: [1,2,3,4,5].map(v => ({ value: String(v), label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1] })) },
        { id: "agency_8", type: "radio", ui: "likert", required: true, label: "8.（AIからの「カオス的」な提案に対し）私は、プロセスをコントロールできていると感じました。",
          options: [1,2,3,4,5].map(v => ({ value: String(v), label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1] })) },

        // Trust（5件法）
        { id: "trust_1", type: "radio", ui: "likert", required: true, label: "9.私は、エージェント（またはAI）の自動化を信頼できると感じました。",
          options: [1,2,3,4,5].map(v => ({ value: String(v), label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1] })) },
        { id: "trust_2", type: "radio", ui: "likert", required: true, label: "10.私が得られた最適なデザインは、納得のいくものだと感じました。",
          options: [1,2,3,4,5].map(v => ({ value: String(v), label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1] })) },
        { id: "trust_3", type: "radio", ui: "likert", required: true, label: "11.私は、デザイン空間で最適なデザインを見つけられたと確信しています。",
          options: [1,2,3,4,5].map(v => ({ value: String(v), label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1] })) },
        { id: "trust_4", type: "radio", ui: "likert", required: true, label: "12.（AIからの提案について）私は、そのAIの意図、透明性、有用性を高く評価しました。",
          options: [1,2,3,4,5].map(v => ({ value: String(v), label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1] })) },
        { id: "trust_5", type: "radio", ui: "likert", required: true, label: "13.私は、コンピューターの提案を信頼できると感じました。",
          options: [1,2,3,4,5].map(v => ({ value: String(v), label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1] })) },
        { id: "trust_6", type: "radio", ui: "likert", required: true, label: "14.（AIからの提案の背景が直接わからない場合でも）私は、その振る舞いを信頼できました。",
          options: [1,2,3,4,5].map(v => ({ value: String(v), label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1] })) },

        // 責任感（5件法）
        { id: "resp_1", type: "radio", ui: "likert", required: true, label: "15.最終的な成果物（例：動画、デザイン）は、私の責任によるものだと感じました。",
          options: [1,2,3,4,5].map(v => ({ value: String(v), label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1] })) },
        { id: "resp_2", type: "radio", ui: "likert", required: true, label: "16.最終的な成果物（例：動画、デザイン）は、AIの責任によるものだと感じました。",
          options: [1,2,3,4,5].map(v => ({ value: String(v), label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1] })) },
        { id: "resp_3", type: "radio", ui: "likert", required: true, label: "17.最終的な成果物（例：動画、デザイン）は、私とAIの共同の責任によるものだと感じました。",
          options: [1,2,3,4,5].map(v => ({ value: String(v), label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1] })) },

        // 自由記述（テキスト）
        { id: "free_overall", type: "text", required: true, label: "18.この手法（アルゴリズム）を使った全体的な感想を教えてください。", placeholder: "ここにテキストを入力" },
        { id: "free_surprise", type: "text", required: true, label: "19.最も意外だった・驚いた瞬間があれば具体的に教えてください。", placeholder: "ここにテキストを入力" },
        { id: "free_stress", type: "text", required: true, label: "20.最もストレスを感じた場面は何でしたか？", placeholder: "ここにテキストを入力" }
    ]
};
