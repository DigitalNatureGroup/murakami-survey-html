// アンケートのインポート
import { nasaTlxSurvey } from '../surveys/nasa-tlx.js';
import { susSurvey } from '../surveys/sus.js';
import { originalSurvey } from '../surveys/original.js';
import { manualOriginalSurvey } from '../surveys/manual-original.js';
import { lastSurvey } from '../surveys/last-survey.js';
import { lastSurvey2 } from '../surveys/last-surveys-2.js';
import { ueqShortSurvey } from '../surveys/ueq-short.js';
import { originalSurvey2 } from '../surveys/original-2.js';
import { manualOriginalSurvey2 } from '../surveys/manual-original-2.js';

// セット設定
export const SURVEY_SETS = {
    "set1": {
        name: "セット1",
        name_en: "Set 1",
        surveys: [
            ueqShortSurvey,
            susSurvey,
            nasaTlxSurvey,
            originalSurvey
        ]
    },
    "set2": {
        name: "セット2",
        name_en: "Set 2",
        surveys: [
            lastSurvey
        ]
    },
    "set3": {
        name: "セット3",
        name_en: "Set 3",
        surveys: [
            ueqShortSurvey,
            susSurvey,
            nasaTlxSurvey,
            manualOriginalSurvey
        ]
    },
    "set4": {
        name: "セット4",
        name_en: "Set 4",
        surveys: [
            ueqShortSurvey,
            susSurvey,
            nasaTlxSurvey,
            originalSurvey2
        ]
    },
    "set5": {
        name: "セット5",
        name_en: "Set 5",
        surveys: [
            lastSurvey2
        ]
    },
    "set6": {
        name: "セット6",
        name_en: "Set 6",
        surveys: [
            ueqShortSurvey,
            susSurvey,
            nasaTlxSurvey,
            manualOriginalSurvey2
        ]
    }
};

 

// methodごとの固定4桁コード設定
export const METHOD_CODE_MAP = {
    // 必要に応じて値を変更してください
    'manual': '1432',
    'bo': '2635',
    'glv_bo_hybrid': '3626',
    'cma-es': '4559',
};
