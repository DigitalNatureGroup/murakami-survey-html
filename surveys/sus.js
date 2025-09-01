// SUS システム使用性評価アンケート
export const susSurvey = {
    id: "sus",
    title: "SUS システム使用性評価",
    description: "システムの使用性について評価をお願いします",
    questions: [
        {
            id: "sus1",
            label: "このシステムを使えば、私は仕事を素早く片付けることができると思う",
            type: "range",
            min: 1,
            max: 5,
            defaultValue: 3,
            anchors: ["強く反対", "強く賛成"]
        },
        {
            id: "sus2",
            label: "このシステムは不必要に複雑だと思う",
            type: "range",
            min: 1,
            max: 5,
            defaultValue: 3,
            anchors: ["強く反対", "強く賛成"]
        },
        {
            id: "sus3",
            label: "このシステムは使いやすいと思う",
            type: "range",
            min: 1,
            max: 5,
            defaultValue: 3,
            anchors: ["強く反対", "強く賛成"]
        },
        {
            id: "sus4",
            label: "このシステムを使うには技術的なサポートが必要だと思う",
            type: "range",
            min: 1,
            max: 5,
            defaultValue: 3,
            anchors: ["強く反対", "強く賛成"]
        },
        {
            id: "sus5",
            label: "このシステムの様々な機能はよく統合されていると思う",
            type: "range",
            min: 1,
            max: 5,
            defaultValue: 3,
            anchors: ["強く反対", "強く賛成"]
        }
    ]
};
