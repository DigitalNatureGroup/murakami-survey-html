// 選択肢形式のアンケート例
export const choiceSurvey = {
    id: "choice-survey",
    title: "選択肢形式アンケート",
    description: "選択肢から選んでください",
    questions: [
        {
            id: "preference",
            label: "最も使いやすい手法はどれですか？",
            description: "実験で使用した手法の中から選んでください",
            type: "radio",
            options: [
                { value: "manual", label: "手動操作" },
                { value: "humbird", label: "Humbird" },
                { value: "bo", label: "Bayesian Optimization" },
                { value: "cma", label: "CMA-ES" }
            ],
            required: true
        },
        {
            id: "frequency",
            label: "このようなシステムをどの程度使用したいですか？",
            type: "select",
            options: [
                { value: "never", label: "使用したくない" },
                { value: "rarely", label: "めったに使用しない" },
                { value: "sometimes", label: "時々使用する" },
                { value: "often", label: "よく使用する" },
                { value: "always", label: "常に使用する" }
            ],
            defaultValue: "sometimes"
        }
    ]
};
