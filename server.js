import express from 'express';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

// 環境変数を読み込み
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// JSONボディパーサー
app.use(express.json());
// ← フォーム（x-www-form-urlencoded）も必ずパースする
app.use(express.urlencoded({ extended: false }));

// 静的ファイルの配信
app.use(express.static(__dirname));

// プロキシエンドポイント
app.post(
  '/api/submit',
  // 1) このルートだけ raw 文字列も受け取れるようにする
  express.text({ type: '*/*' }),
  async (req, res) => {
    try {
      // --- 受信の可視化 ---
      const ct = req.headers['content-type'] || '';
      console.log('client->proxy content-type:', ct);

      let bodyObj = {};

      if (ct.includes('application/x-www-form-urlencoded')) {
        // fetch で URLSearchParams を送ってくる想定
        // → 文字列なら手動でパース、オブジェクトならそのまま
        if (typeof req.body === 'string' && req.body.length) {
          bodyObj = Object.fromEntries(new URLSearchParams(req.body));
        } else if (req.body && typeof req.body === 'object') {
          bodyObj = req.body;
        }
      } else if (ct.includes('application/json')) {
        // JSON 送信の場合（保険）
        if (typeof req.body === 'string' && req.body.length) {
          bodyObj = JSON.parse(req.body);
        } else if (req.body && typeof req.body === 'object') {
          bodyObj = req.body;
        }
      } else {
        // 不明な場合も文字列なら試しに form として解釈
        if (typeof req.body === 'string' && req.body.length) {
          try {
            bodyObj = Object.fromEntries(new URLSearchParams(req.body));
          } catch (_) {}
        }
      }

      console.log('client->proxy parsed keys:', Object.keys(bodyObj || {}));
      console.log('client->proxy parsed body:', bodyObj);

      // 必須キーが無ければ 400 を返して早期発見
      const { uid, task_state, method, group } = bodyObj || {};
      if (!uid || !task_state || !method || !group || !bodyObj.payload) {
        return res.status(400).json({ error: 'missing fields at proxy', got: bodyObj });
      }

      // payload は「文字列ならそのまま」「オブジェクトなら stringify」
      const payloadStr =
        typeof bodyObj.payload === 'string' ? bodyObj.payload : JSON.stringify(bodyObj.payload);

      // 2) GAS へは “必ず” フォームとして再送
      const params = new URLSearchParams({
        uid,
        task_state,
        method,
        group,
        payload: payloadStr
      }).toString();

      const gasUrl =
        process.env.GAS_URL ||
        'https://script.google.com/macros/s/AKfycbyQ3lNZD8-Qc9i748yBAH-N6OqmGdhbkLXnBYPJhM0tMQcqqI7sjJDh_KA-HgXIb91Pyw/exec';

      const r = await fetch(gasUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: params
      });

      const text = await r.text();
      console.log('GAS応答 status:', r.status);
      res.status(r.status).send(text);
    } catch (err) {
      console.error('proxy error:', err);
      res.status(500).json({ error: String(err) });
    }
  }
);

// フォールバック保存: サーバーに participant-data を作成し追記
app.post('/api/fallback-save', async (req, res) => {
  try {
    const dir = join(__dirname, 'participant-data');
    const file = join(dir, 'submissions.ndjson');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    const record = {
      timestamp: new Date().toISOString(),
      payload: req.body
    };
    fs.appendFileSync(file, JSON.stringify(record) + '\n', 'utf8');
    res.json({ status: 'saved' });
  } catch (err) {
    console.error('フォールバック保存エラー:', err);
    res.status(500).json({ error: String(err) });
  }
});

// ヘルスチェックエンドポイント
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ルートパスでindex.htmlを配信
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`サーバーがポート ${PORT} で起動しました`);
  console.log(`GAS URL: ${process.env.GAS_URL || 'デフォルトURL'}`);
  console.log(`http://localhost:${PORT}`);
});
