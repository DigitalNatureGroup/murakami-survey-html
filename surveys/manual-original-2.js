// マニュアルオリジナル調査アンケート2
export const manualOriginalSurvey2 = {
    id: "manual-original-2",
    title: "Agency / Trust / 責任感・自由記述2",
    title_en: "Agency / Trust / Responsibility & Free Description 2",
    description: "以下の設問にお答えください。",
    description_en: "Please answer the following questions.",
    questions: [
        // 作品評価（5件法）
        { 
            id: "sec_work_evaluation", 
            type: "section", 
            title: "【作品評価】", 
            title_en: "【Work Evaluation】",
            note: "あなたが作成した作品について評価してください。",
            note_en: "Please evaluate the work you created."
        },
        { 
            id: "1.あなたが作ったこの作品は新規性や独創性が高いと思いますか？", 
            type: "radio", 
            ui: "likert", 
            required: true, 
            label: "あなたが作ったこの作品は新規性や独創性が高いと思いますか？",
            label_en: "Do you think the work you created has high novelty and originality?",
            options: [1,2,3,4,5].map(v => ({ 
                value: String(v), 
                label: ["低い","やや低い","普通","やや高い","高い"][v-1],
                label_en: ["Low","Somewhat low","Average","Somewhat high","High"][v-1]
            })) 
        },
        { 
            id: "2.あなたが作ったこの作品はアイデアや感情を豊かに表現できていますか？", 
            type: "radio", 
            ui: "likert", 
            required: true, 
            label: "あなたが作ったこの作品はアイデアや感情を豊かに表現できていますか？",
            label_en: "Does the work you created richly express ideas and emotions?",
            options: [1,2,3,4,5].map(v => ({ 
                value: String(v), 
                label: ["低い","やや低い","普通","やや高い","高い"][v-1],
                label_en: ["Low","Somewhat low","Average","Somewhat high","High"][v-1]
            })) 
        },
        { 
            id: "3.あなたが作ったこの作品は十分に完成された出来映えだと思いますか？", 
            type: "radio", 
            ui: "likert", 
            required: true, 
            label: "あなたが作ったこの作品は十分に完成された出来映えだと思いますか？",
            label_en: "Do you think the work you created is sufficiently completed?",
            options: [1,2,3,4,5].map(v => ({ 
                value: String(v), 
                label: ["低い","やや低い","普通","やや高い","高い"][v-1],
                label_en: ["Low","Somewhat low","Average","Somewhat high","High"][v-1]
            })) 
        },
        { 
            id: "4.あなたはこの作品の出来栄えに満足していますか？", 
            type: "radio", 
            ui: "likert", 
            required: true, 
            label: "あなたはこの作品の出来栄えに満足していますか？",
            label_en: "Are you satisfied with the quality of this work?",
            options: [1,2,3,4,5].map(v => ({ 
                value: String(v), 
                label: ["低い","やや低い","普通","やや高い","高い"][v-1],
                label_en: ["Low","Somewhat low","Average","Somewhat high","High"][v-1]
            })) 
        },
        { 
            id: "5.この作品の制作には多くの労力が必要でしたか？", 
            type: "radio", 
            ui: "likert", 
            required: true, 
            label: "この作品の制作には多くの労力が必要でしたか？",
            label_en: "Did creating this work require a lot of effort?",
            options: [1,2,3,4,5].map(v => ({ 
                value: String(v), 
                label: ["低い","やや低い","普通","やや高い","高い"][v-1],
                label_en: ["Low","Somewhat low","Average","Somewhat high","High"][v-1]
            })) 
        },

        // Agency（5件法）
        { 
            id: "sec_agency", 
            type: "section", 
            title: "【Agency（主体性・制御感）】", 
            title_en: "【Agency (Autonomy & Control)】",
            note: "システム使用時の主体性や制御感について評価してください。",
            note_en: "Please evaluate your sense of autonomy and control when using the system."
        },
        { 
            id: "6.私は、自分の行動を完全にコントロールできていると感じました。", 
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
            id: "7.私は、システムに振り回されていると感じました。（逆転）", 
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
            id: "8.私の行動の結果が、意図した通りに論理的に繋がっていると感じられませんでした。（逆転）", 
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
            id: "9.私は、デザイン空間の異なる領域を探索する上で、システムをコントロールできていると感じました。", 
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
            id: "10.このシステムを使用することで、デザインの出力に対する各デザインパラメータの影響を把握できました。", 
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
            id: "11.このシステムを使用することで、デザイン空間について直感的に理解できました。", 
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
            id: "sec_trust", 
            type: "section", 
            title: "【Trust（信頼性）】", 
            title_en: "【Trust (Reliability)】",
            note: "AIやシステムへの信頼性について評価してください。",
            note_en: "Please evaluate your trust in AI and the system."
        },
        { 
            id: "12.私が得られた最適なデザインは、納得のいくものだと感じました。", 
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
            id: "13.私は、デザイン空間で最適なデザインを見つけられたと確信しています。", 
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
            id: "sec_responsibility", 
            type: "section", 
            title: "【責任感】", 
            title_en: "【Responsibility】",
            note: "最終的な成果物に対する責任感について評価してください。",
            note_en: "Please evaluate your sense of responsibility for the final output."
        },
        { 
            id: "14.最終的な成果物（例：動画、デザイン）は、私の責任によるものだと感じました。", 
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
            id: "sec_free_description", 
            type: "section", 
            title: "【自由記述】", 
            title_en: "【Free Description】",
            note: "体験について自由にお聞かせください。",
            note_en: "Please freely share your experience."
        },
        { 
            id: "15.この手法（アルゴリズム）を使った全体的な感想を教えてください。", 
            type: "text", 
            required: true, 
            label: "この手法（アルゴリズム）を使った全体的な感想を教えてください。",
            label_en: "Please tell us your overall impressions of using this method (algorithm).",
            placeholder: "ここにテキストを入力",
            placeholder_en: "Please enter your text here"
        },
        { 
            id: "16.最も意外だった・驚いた瞬間があれば具体的に教えてください。", 
            type: "text", 
            required: true, 
            label: "最も意外だった・驚いた瞬間があれば具体的に教えてください。",
            label_en: "If there was a moment that was most surprising or shocking, please tell us specifically.",
            placeholder: "ここにテキストを入力",
            placeholder_en: "Please enter your text here"
        },
        { 
            id: "17.最もストレスを感じた場面は何でしたか？", 
            type: "text", 
            required: true, 
            label: "最もストレスを感じた場面は何でしたか？",
            label_en: "What was the most stressful situation?",
            placeholder: "ここにテキストを入力",
            placeholder_en: "Please enter your text here"
        }
    ]
};
