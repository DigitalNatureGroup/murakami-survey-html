// オリジナル調査アンケート
export const originalSurvey = {
    id: "original",
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
            label: "1.私は、自分の行動を完全にコントロールできていると感じました。",
            label_en: "1. I felt that I had complete control over my actions.",
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
            label: "2.私は、システムに振り回されていると感じました。",
            label_en: "2. I felt that I was being controlled by the system.",
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
            label: "3.私の行動の結果が、意図した通りに論理的に繋がっていると感じられませんでした。",
            label_en: "3. I did not feel that the results of my actions were logically connected as intended.",
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
            label: "4.私は、デザイン空間の異なる領域を探索する上で、システムをコントロールできていると感じました。",
            label_en: "4. I felt that I could control the system while exploring different areas of the design space.",
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
            label: "5.このシステムを使用することで、デザインの出力に対する各デザインパラメータの影響を把握できました。",
            label_en: "5. By using this system, I was able to understand the impact of each design parameter on the design output.",
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
            label: "6.このシステムを使用することで、デザイン空間について直感的に理解できました。",
            label_en: "6. By using this system, I was able to intuitively understand the design space.",
            options: [1,2,3,4,5].map(v => ({ 
                value: String(v), 
                label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1],
                label_en: ["Strongly disagree","Disagree","Neither agree nor disagree","Agree","Strongly agree"][v-1]
            })) 
        },
        { 
            id: "7.AIからの提案があった後でも、私は自分のデザインの意図に沿って評価を行っていると感じました。", 
            type: "radio", 
            ui: "likert", 
            required: true, 
            label: "7.AIからの提案があった後でも、私は自分のデザインの意図に沿って評価を行っていると感じました。",
            label_en: "7. Even after receiving suggestions from AI, I felt that I was evaluating according to my own design intentions.",
            options: [1,2,3,4,5].map(v => ({ 
                value: String(v), 
                label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1],
                label_en: ["Strongly disagree","Disagree","Neither agree nor disagree","Agree","Strongly agree"][v-1]
            })) 
        },
        { 
            id: "8.（AIからの「カオス的」な提案に対し）私は、プロセスをコントロールできていると感じました。", 
            type: "radio", 
            ui: "likert", 
            required: true, 
            label: "8.（AIからの「カオス的」な提案に対し）私は、プロセスをコントロールできていると感じました。",
            label_en: "8. (Regarding AI's 'chaotic' suggestions) I felt that I could control the process.",
            options: [1,2,3,4,5].map(v => ({ 
                value: String(v), 
                label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1],
                label_en: ["Strongly disagree","Disagree","Neither agree nor disagree","Agree","Strongly agree"][v-1]
            })) 
        },

        // Trust（5件法）
        { 
            id: "9.私は、エージェント（またはAI）の自動化を信頼できると感じました。", 
            type: "radio", 
            ui: "likert", 
            required: true, 
            label: "9.私は、エージェント（またはAI）の自動化を信頼できると感じました。",
            label_en: "9. I felt that I could trust the automation of the agent (or AI).",
            options: [1,2,3,4,5].map(v => ({ 
                value: String(v), 
                label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1],
                label_en: ["Strongly disagree","Disagree","Neither agree nor disagree","Agree","Strongly agree"][v-1]
            })) 
        },
        { 
            id: "10.私が得られた最適なデザインは、納得のいくものだと感じました。", 
            type: "radio", 
            ui: "likert", 
            required: true, 
            label: "10.私が得られた最適なデザインは、納得のいくものだと感じました。",
            label_en: "10. I felt that the optimal design I obtained was satisfactory.",
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
            label: "11.私は、デザイン空間で最適なデザインを見つけられたと確信しています。",
            label_en: "11. I am confident that I found the optimal design in the design space.",
            options: [1,2,3,4,5].map(v => ({ 
                value: String(v), 
                label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1],
                label_en: ["Strongly disagree","Disagree","Neither agree nor disagree","Agree","Strongly agree"][v-1]
            })) 
        },
        { 
            id: "12.（AIからの提案について）私は、そのAIの意図、透明性、有用性を高く評価しました。", 
            type: "radio", 
            ui: "likert", 
            required: true, 
            label: "12.（AIからの提案について）私は、そのAIの意図、透明性、有用性を高く評価しました。",
            label_en: "12. (Regarding AI suggestions) I highly rated the AI's intentions, transparency, and usefulness.",
            options: [1,2,3,4,5].map(v => ({ 
                value: String(v), 
                label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1],
                label_en: ["Strongly disagree","Disagree","Neither agree nor disagree","Agree","Strongly agree"][v-1]
            })) 
        },
        { 
            id: "13.私は、コンピューターの提案を信頼できると感じました。", 
            type: "radio", 
            ui: "likert", 
            required: true, 
            label: "13.私は、コンピューターの提案を信頼できると感じました。",
            label_en: "13. I felt that I could trust the computer's suggestions.",
            options: [1,2,3,4,5].map(v => ({ 
                value: String(v), 
                label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1],
                label_en: ["Strongly disagree","Disagree","Neither agree nor disagree","Agree","Strongly agree"][v-1]
            })) 
        },
        { 
            id: "14.（AIからの提案の背景が直接わからない場合でも）私は、その振る舞いを信頼できました。", 
            type: "radio", 
            ui: "likert", 
            required: true, 
            label: "14.（AIからの提案の背景が直接わからない場合でも）私は、その振る舞いを信頼できました。",
            label_en: "14. (Even when I couldn't directly understand the background of AI suggestions) I could trust its behavior.",
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
            label: "15.最終的な成果物（例：動画、デザイン）は、私の責任によるものだと感じました。",
            label_en: "15. I felt that the final output (e.g., video, design) was my responsibility.",
            options: [1,2,3,4,5].map(v => ({ 
                value: String(v), 
                label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1],
                label_en: ["Strongly disagree","Disagree","Neither agree nor disagree","Agree","Strongly agree"][v-1]
            })) 
        },
        { 
            id: "16.最終的な成果物（例：動画、デザイン）は、AIの責任によるものだと感じました。", 
            type: "radio", 
            ui: "likert", 
            required: true, 
            label: "16.最終的な成果物（例：動画、デザイン）は、AIの責任によるものだと感じました。",
            label_en: "16. I felt that the final output (e.g., video, design) was the AI's responsibility.",
            options: [1,2,3,4,5].map(v => ({ 
                value: String(v), 
                label: ["全くそう思わない","あまりそう思わない","どちらともいえない","ややそう思う","強くそう思う"][v-1],
                label_en: ["Strongly disagree","Disagree","Neither agree nor disagree","Agree","Strongly agree"][v-1]
            })) 
        },
        { 
            id: "17.最終的な成果物（例：動画、デザイン）は、私とAIの共同の責任によるものだと感じました。", 
            type: "radio", 
            ui: "likert", 
            required: true, 
            label: "17.最終的な成果物（例：動画、デザイン）は、私とAIの共同の責任によるものだと感じました。",
            label_en: "17. I felt that the final output (e.g., video, design) was the joint responsibility of myself and the AI.",
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
            label: "18.この手法（アルゴリズム）を使った全体的な感想を教えてください。",
            label_en: "18. Please tell us your overall impressions of using this method (algorithm).",
            placeholder: "ここにテキストを入力",
            placeholder_en: "Please enter your text here"
        },
        { 
            id: "19.最も意外だった・驚いた瞬間があれば具体的に教えてください。", 
            type: "text", 
            required: true, 
            label: "19.最も意外だった・驚いた瞬間があれば具体的に教えてください。",
            label_en: "19. If there was a moment that was most surprising or shocking, please tell us specifically.",
            placeholder: "ここにテキストを入力",
            placeholder_en: "Please enter your text here"
        },
        { 
            id: "20.最もストレスを感じた場面は何でしたか？", 
            type: "text", 
            required: true, 
            label: "20.最もストレスを感じた場面は何でしたか？",
            label_en: "20. What was the most stressful situation?",
            placeholder: "ここにテキストを入力",
            placeholder_en: "Please enter your text here"
        }
    ]
};
