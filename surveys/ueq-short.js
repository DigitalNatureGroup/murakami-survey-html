// UEQ-Short アンケート
export const ueqShortSurvey = {
    id: "ueq-short",
    title: "UEQ-Short（ユーザー体験）",
    title_en: "UEQ-Short (User Experience Questionnaire)",
    description: "各行について、左と右の形容詞のあいだで感じ方に最も近い●を選んでください（7段階）。",
    description_en: "For each row, please select the circle that best represents your feeling between the left and right adjectives (7-point scale).",
    questions: [
        { 
            id: "ueq_1", 
            type: "ueq7", 
            left: "妨げになる",     
            left_en: "Obstructive",
            right: "助けられる",    
            right_en: "Supportive",
            required: true 
        },
        { 
            id: "ueq_2", 
            type: "ueq7", 
            left: "複雑",           
            left_en: "Complicated",
            right: "簡単",          
            right_en: "Simple",
            required: true 
        },
        { 
            id: "ueq_3", 
            type: "ueq7", 
            left: "効率が悪い",     
            left_en: "Inefficient",
            right: "効率が良い",    
            right_en: "Efficient",
            required: true 
        },
        { 
            id: "ueq_4", 
            type: "ueq7", 
            left: "ごちゃごちゃ",   
            left_en: "Confusing",
            right: "すっきり",      
            right_en: "Clear",
            required: true 
        },
        { 
            id: "ueq_5", 
            type: "ueq7", 
            left: "退屈",           
            left_en: "Boring",
            right: "エキサイティング", 
            right_en: "Exciting",
            required: true 
        },
        { 
            id: "ueq_6", 
            type: "ueq7", 
            left: "おもしろくない", 
            left_en: "Not interesting",
            right: "おもしろい",    
            right_en: "Interesting",
            required: true 
        },
        { 
            id: "ueq_7", 
            type: "ueq7", 
            left: "従来どおり",     
            left_en: "Conventional",
            right: "独特だ",        
            right_en: "Inventive",
            required: true 
        },
        { 
            id: "ueq_8", 
            type: "ueq7", 
            left: "普通",           
            left_en: "Usual",
            right: "斬新的",        
            right_en: "Leading edge",
            required: true 
        }
    ]
};


