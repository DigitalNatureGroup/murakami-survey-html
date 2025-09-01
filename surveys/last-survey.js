// 最終調査アンケート
export const lastSurvey = {
    id: "last-survey",
    title: "最終調査",
    description: "実験の最終評価をお願いします",
    questions: [
        {
            id: "overall_satisfaction",
            label: "全体的な満足度",
            description: "実験全体に対する満足度を評価してください",
            type: "range",
            min: 1,
            max: 10,
            defaultValue: 5,
            anchors: ["非常に不満", "非常に満足"]
        },
        {
            id: "recommendation",
            label: "推奨度",
            description: "このシステムを他の人に推奨しますか？",
            type: "range",
            min: 1,
            max: 10,
            defaultValue: 5,
            anchors: ["絶対に推奨しない", "強く推奨する"]
        },
        {
            id: "comments",
            label: "コメント",
            description: "自由にコメントをお書きください",
            type: "text",
            placeholder: "コメントを入力してください..."
        }
    ]
};
