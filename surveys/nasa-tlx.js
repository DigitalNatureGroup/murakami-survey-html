// NASA-TLX アンケート
export const nasaTlxSurvey = {
    id: "nasa-tlx",
    title: "NASA-TLX 作業負荷評価",
    title_en: "NASA-TLX Workload Assessment",
    description: "作業負荷に関する評価をお願いします",
    description_en: "Please evaluate the workload",
    questions: [
        {
            id: "mental",
            label: "精神的要求 (Mental Demand)",
            label_en: "Mental Demand",
            description: "どの程度の知的・知覚的活動（考える、決める、計算する、記憶する，見るなど）を必要としましたか.課題はやさしかったですか難しかったですか. 単純でしたか複雑でしたか,正確さが求められましたか, 大ざっぱでよかったですか.",
            description_en: "How much mental and perceptual activity was required (e.g., thinking, deciding, calculating, remembering, looking, searching, etc.)? Was the task easy or demanding, simple or complex, exacting or forgiving?",
            type: "range",
            min: 0,
            max: 100,
            defaultValue: 50,
            anchors: ["小さい", "大きい"],
            anchors_en: ["Low", "High"]
        },
        {
            id: "physical",
            label: "身体的要求 (Physical Demand)",
            label_en: "Physical Demand",
            description: "どの程度の身体的活動（押す、引く、回す、制倒する、動き回るなど）を必要としましたか.作業はラクでしたかキツかったですか、ゆっくりできましたかキビキビやらなければなりませんでしたか、休み休みできましたか働きづめでしたか.",
            description_en: "How much physical activity was required (e.g., pushing, pulling, turning, controlling, activating, etc.)? Was the task easy or demanding, slow or rapid, slack or strenuous, restful or laborious?",
            type: "range",
            min: 0,
            max: 100,
            defaultValue: 50,
            anchors: ["小さい", "大きい"],
            anchors_en: ["Low", "High"]
        },
        {
            id: "temporal",
            label: "時間的要求 (Temporal Demand)",
            label_en: "Temporal Demand",
            description: "仕事のペースや課題が発生する頻度のために感じる時間的切迫感はどの程度でしたか. ペースはゆっくりとして余裕があるものでしたか, それとも速くて余裕のないものでしたか.",
            description_en: "How much time pressure did you feel due to the rate or pace at which the tasks or task elements occurred? Was the pace slow and leisurely or rapid and frantic?",
            type: "range",
            min: 0,
            max: 100,
            defaultValue: 50,
            anchors: ["短い", "長い"],
            anchors_en: ["Low", "High"]
        },
        {
            id: "performance",
            label: "作業成績 (Performance)",
            label_en: "Performance",
            description: "作業指示者（またはあなた自身）によって設定された課題の目標をどの程度達成できたと思いますか. 目標の達成に関して自分の作業成績にどの程度満足していますか.",
            description_en: "How successful do you think you were in accomplishing the goals of the task set by the experimenter (or yourself)? How satisfied were you with your performance in accomplishing these goals?",
            type: "range",
            min: 0,
            max: 100,
            defaultValue: 50,
            anchors: ["良い", "悪い"],
            anchors_en: ["Good", "Poor"]
        },
        {
            id: "effort",
            label: "努力 (Effort)",
            label_en: "Effort",
            description: "作業成績のレベルを達成・維持するために, 精神的・身体的にどの程度いっしょうけんめいに作業しなけれはなりませんでしたか.",
            description_en: "How hard did you have to work (mentally and physically) to accomplish your level of performance?",
            type: "range",
            min: 0,
            max: 100,
            defaultValue: 50,
            anchors: ["少ない", "多い"],
            anchors_en: ["Low", "High"]
        },
        {
            id: "frustration",
            label: "欲求不満 (Frustration)",
            label_en: "Frustration",
            description: "作業中に、不安感、落胆、いらいら、ストレス、悩みをどの程度感じましたか. あるいは逆に、安心感、満足感、充足感、楽しさ、リラックスをどの程度感じましたか.",
            description_en: "How insecure, discouraged, irritated, stressed, and annoyed versus secure, gratified, content, relaxed, and complacent did you feel during the task?",
            type: "range",
            min: 0,
            max: 100,
            defaultValue: 50,
            anchors: ["低い", "高い"],
            anchors_en: ["Low", "High"]
        },
        {
            id: "overall",
            label: "全体的負荷 (Overall Workload)",
            label_en: "Overall Workload",
            description: "さまざまな負荷要因，負荷原因. 部分部分の課題内容を総合すると、全体としてどの程度の作業負担を感じましたか.",
            description_en: "Overall, how much workload did you experience from all sources?",
            type: "range",
            min: 0,
            max: 100,
            defaultValue: 50,
            anchors: ["低い", "高い"],
            anchors_en: ["Low", "High"]
        }
    ]
};
