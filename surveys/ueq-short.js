// UEQ-Short アンケート
export const ueqShortSurvey = {
    id: "ueq-short",
    title: "UEQ-Short（ユーザー体験）",
    description: "各行について、左と右の形容詞のあいだで感じ方に最も近い●を選んでください（7段階）。",
    questions: [
        { id: "ueq_1", type: "ueq7", left: "妨げになる",     right: "助けられる",    required: true },
        { id: "ueq_2", type: "ueq7", left: "複雑",           right: "簡単",          required: true },
        { id: "ueq_3", type: "ueq7", left: "効率が悪い",     right: "効率が良い",    required: true },
        { id: "ueq_4", type: "ueq7", left: "ごちゃごちゃ",   right: "すっきり",      required: true },
        { id: "ueq_5", type: "ueq7", left: "退屈",           right: "エキサイティング", required: true },
        { id: "ueq_6", type: "ueq7", left: "おもしろくない", right: "おもしろい",    required: true },
        { id: "ueq_7", type: "ueq7", left: "従来どおり",     right: "独特だ",        required: true },
        { id: "ueq_8", type: "ueq7", left: "普通",           right: "斬新的",        required: true }
    ]
};


