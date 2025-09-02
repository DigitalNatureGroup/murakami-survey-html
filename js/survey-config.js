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
            nasaTlxSurvey,
            susSurvey,
            originalSurvey,
            ueqShortSurvey
        ]
    },
    "set2": {
        name: "セット2",
        surveys: [
            lastSurvey
        ]
    }
};

// GASのエンドポイント設定
export const GAS_ENDPOINT = "YOUR_GAS_ENDPOINT_URL_HERE"; // 実際のGASのURLに置き換えてください 
