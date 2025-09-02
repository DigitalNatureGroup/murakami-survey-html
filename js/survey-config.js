// アンケートのインポート
import { nasaTlxSurvey } from '../surveys/nasa-tlx.js';
import { susSurvey } from '../surveys/sus.js';
import { originalSurvey } from '../surveys/original.js';
import { lastSurvey } from '../surveys/last-survey.js';
import { ueqShortSurvey } from '../surveys/ueq-short.js';

// セット設定
export const SURVEY_SETS = {
    "set1": {
        name: "セット1",
        surveys: [
            ueqShortSurvey,
            susSurvey,
            nasaTlxSurvey,
            originalSurvey
        ]
    },
    "set2": {
        name: "セット2",
        surveys: [
            lastSurvey
        ]
    }
};

 

// methodごとの固定4桁コード設定
export const METHOD_CODE_MAP = {
    // 必要に応じて値を変更してください
    'manual': '1432',
    'bo': '2635',
    'glv-bo': '3626',
    'cma-es': '4559'
};
