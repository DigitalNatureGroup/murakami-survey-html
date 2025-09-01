// NASA-TLX アンケート
export const nasaTlxSurvey = {
    id: "nasa-tlx",
    title: "NASA-TLX 作業負荷評価",
    description: "作業負荷に関する評価をお願いします",
    questions: [
        {
            id: "mental",
            label: "精神的要求 (Mental Demand)",
            description: "どの程度の知的・知覚的活動（考える、決める、計算する、記憶する，見るなど）を必要としましたか.課題はやさしかったですか難しかったですか. 単純でしたか複雑でしたか,正確さが求められましたか, 大ざっぱでよかったですか.",
            type: "range",
            min: 0,
            max: 100,
            defaultValue: 50,
            anchors: ["小さい", "大きい"]
        },
        {
            id: "physical",
            label: "身体的要求 (Physical Demand)",
            description: "どの程度の身体的活動（押す、引く、回す、制倒する、動き回るなど）を必要としましたか.作業はラクでしたかキツかったですか、ゆっくりできましたかキビキビやらなければなりませんでしたか、休み休みできましたか働きづめでしたか.",
            type: "range",
            min: 0,
            max: 100,
            defaultValue: 50,
            anchors: ["小さい", "大きい"]
        },
        {
            id: "temporal",
            label: "時間的要求 (Temporal Demand)",
            description: "仕事のペースや課題が発生する頻度のために感じる時間的切迫感はどの程度でしたか. ペースはゆっくりとして余裕があるものでしたか, それとも速くて余裕のないものでしたか.",
            type: "range",
            min: 0,
            max: 100,
            defaultValue: 50,
            anchors: ["短い", "長い"]
        },
        {
            id: "performance",
            label: "作業成績 (Performance)",
            description: "作業指示者（またはあなた自身）によって設定された課題の目標をどの程度達成できたと思いますか. 目標の達成に関して自分の作業成績にどの程度満足していますか.",
            type: "range",
            min: 0,
            max: 100,
            defaultValue: 50,
            anchors: ["良い", "悪い"]
        },
        {
            id: "effort",
            label: "努力 (Effort)",
            description: "作業成績のレベルを達成・維持するために, 精神的・身体的にどの程度いっしょうけんめいに作業しなけれはなりませんでしたか.",
            type: "range",
            min: 0,
            max: 100,
            defaultValue: 50,
            anchors: ["少ない", "多い"]
        },
        {
            id: "frustration",
            label: "欲求不満 (Frustration)",
            description: "作業中に、不安感、落胆、いらいら、ストレス、悩みをどの程度感じましたか. あるいは逆に、安心感、満足感、充足感、楽しさ、リラックスをどの程度感じましたか.",
            type: "range",
            min: 0,
            max: 100,
            defaultValue: 50,
            anchors: ["低い", "高い"]
        },
        {
            id: "overall",
            label: "全体的負荷 (Overall Workload)",
            description: "さまざまな負荷要因，負荷原因. 部分部分の課題内容を総合すると、全体としてどの程度の作業負担を感じましたか.",
            type: "range",
            min: 0,
            max: 100,
            defaultValue: 50,
            anchors: ["低い", "高い"]
        }
    ]
};
