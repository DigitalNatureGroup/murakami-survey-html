// オリジナル調査アンケート
export const originalSurvey = {
    id: "original",
    title: "オリジナル調査",
    description: "追加の調査項目です",
    questions: [
        {
            id: "satisfaction",
            label: "全体的な満足度",
            description: "今回の実験に対する満足度を評価してください",
            type: "range",
            min: 1,
            max: 7,
            defaultValue: 4,
            anchors: ["非常に不満", "非常に満足"]
        },
        {
            id: "difficulty",
            label: "課題の難易度",
            description: "課題の難易度を評価してください",
            type: "range",
            min: 1,
            max: 7,
            defaultValue: 4,
            anchors: ["非常に簡単", "非常に困難"]
        }
    ]
};
