// マニュアルオリジナル調査アンケート
export const manualOriginalSurvey = {
    id: "manual-original",
    title: "Agency / Trust / 責任感・自由記述",
    title_en: "Agency / Trust / Responsibility & Free Description",
    description: "以下の設問にお答えください。",
    description_en: "Please answer the following questions.",
    questions: [
        // Agency（5件法）
        { 
            id: "1.私は、自分の行動を完全にコントロールできていると感じました。", 
            type: "radio", 
            ui: "likert", 
            required: true, 
            label: "私は、自分の行動を完全にコントロールできていると感じました。",
            label_en: "I felt that I had complete control over my actions.",
            options: [1,2,3,4,5].map(v => ({ 
                value: String(v), 
                label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1],
                label_en: ["Strongly disagree","Disagree","Neither agree nor disagree","Agree","Strongly agree"][v-1]
            })) 
        },
        { 
            id: "2.私は、システムに振り回されていると感じました。（逆転）", 
            type: "radio", 
            ui: "likert", 
            required: true, 
            label: "私は、システムに振り回されていると感じました。",
            label_en: "I felt that I was being controlled by the system.",
            options: [1,2,3,4,5].map(v => ({ 
                value: String(v), 
                label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1],
                label_en: ["Strongly disagree","Disagree","Neither agree nor disagree","Agree","Strongly agree"][v-1]
            })) 
        },
        { 
            id: "3.私の行動の結果が、意図した通りに論理的に繋がっていると感じられませんでした。（逆転）", 
            type: "radio", 
            ui: "likert", 
            required: true, 
            label: "私の行動の結果が、意図した通りに論理的に繋がっていると感じられませんでした。",
            label_en: "I did not feel that the results of my actions were logically connected as intended.",
            options: [1,2,3,4,5].map(v => ({ 
                value: String(v), 
                label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1],
                label_en: ["Strongly disagree","Disagree","Neither agree nor disagree","Agree","Strongly agree"][v-1]
            })) 
        },
        { 
            id: "4.私は、デザイン空間の異なる領域を探索する上で、システムをコントロールできていると感じました。", 
            type: "radio", 
            ui: "likert", 
            required: true, 
            label: "私は、デザイン空間の異なる領域を探索する上で、システムをコントロールできていると感じました。",
            label_en: "I felt that I could control the system while exploring different areas of the design space.",
            options: [1,2,3,4,5].map(v => ({ 
                value: String(v), 
                label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1],
                label_en: ["Strongly disagree","Disagree","Neither agree nor disagree","Agree","Strongly agree"][v-1]
            })) 
        },
        { 
            id: "5.このシステムを使用することで、デザインの出力に対する各デザインパラメータの影響を把握できました。", 
            type: "radio", 
            ui: "likert", 
            required: true, 
            label: "このシステムを使用することで、デザインの出力に対する各デザインパラメータの影響を把握できました。",
            label_en: "By using this system, I was able to understand the impact of each design parameter on the design output.",
            options: [1,2,3,4,5].map(v => ({ 
                value: String(v), 
                label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1],
                label_en: ["Strongly disagree","Disagree","Neither agree nor disagree","Agree","Strongly agree"][v-1]
            })) 
        },
        { 
            id: "6.このシステムを使用することで、デザイン空間について直感的に理解できました。", 
            type: "radio", 
            ui: "likert", 
            required: true, 
            label: "このシステムを使用することで、デザイン空間について直感的に理解できました。",
            label_en: "By using this system, I was able to intuitively understand the design space.",
            options: [1,2,3,4,5].map(v => ({ 
                value: String(v), 
                label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1],
                label_en: ["Strongly disagree","Disagree","Neither agree nor disagree","Agree","Strongly agree"][v-1]
            })) 
        },

        // Trust（5件法）
        { 
            id: "10.私が得られた最適なデザインは、納得のいくものだと感じました。", 
            type: "radio", 
            ui: "likert", 
            required: true, 
            label: "私が得られた最適なデザインは、納得のいくものだと感じました。",
            label_en: "I felt that the optimal design I obtained was satisfactory.",
            options: [1,2,3,4,5].map(v => ({ 
                value: String(v), 
                label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1],
                label_en: ["Strongly disagree","Disagree","Neither agree nor disagree","Agree","Strongly agree"][v-1]
            })) 
        },
        { 
            id: "11.私は、デザイン空間で最適なデザインを見つけられたと確信しています。", 
            type: "radio", 
            ui: "likert", 
            required: true, 
            label: "私は、デザイン空間で最適なデザインを見つけられたと確信しています。",
            label_en: "I am confident that I found the optimal design in the design space.",
            options: [1,2,3,4,5].map(v => ({ 
                value: String(v), 
                label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1],
                label_en: ["Strongly disagree","Disagree","Neither agree nor disagree","Agree","Strongly agree"][v-1]
            })) 
        },

        // 責任感（5件法）
        { 
            id: "15.最終的な成果物（例：動画、デザイン）は、私の責任によるものだと感じました。", 
            type: "radio", 
            ui: "likert", 
            required: true, 
            label: "最終的な成果物（例：動画、デザイン）は、私の責任によるものだと感じました。",
            label_en: "I felt that the final output (e.g., video, design) was my responsibility.",
            options: [1,2,3,4,5].map(v => ({ 
                value: String(v), 
                label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1],
                label_en: ["Strongly disagree","Disagree","Neither agree nor disagree","Agree","Strongly agree"][v-1]
            })) 
        },

        // 自由記述（テキスト）
        { 
            id: "18.この手法（アルゴリズム）を使った全体的な感想を教えてください。", 
            type: "text", 
            required: true, 
            label: "この手法（アルゴリズム）を使った全体的な感想を教えてください。",
            label_en: "Please tell us your overall impressions of using this method (algorithm).",
            placeholder: "ここにテキストを入力",
            placeholder_en: "Please enter your text here"
        },
        { 
            id: "19.最も意外だった・驚いた瞬間があれば具体的に教えてください。", 
            type: "text", 
            required: true, 
            label: "最も意外だった・驚いた瞬間があれば具体的に教えてください。",
            label_en: "If there was a moment that was most surprising or shocking, please tell us specifically.",
            placeholder: "ここにテキストを入力",
            placeholder_en: "Please enter your text here"
        },
        { 
            id: "20.最もストレスを感じた場面は何でしたか？", 
            type: "text", 
            required: true, 
            label: "最もストレスを感じた場面は何でしたか？",
            label_en: "What was the most stressful situation?",
            placeholder: "ここにテキストを入力",
            placeholder_en: "Please enter your text here"
        }
    ]
};