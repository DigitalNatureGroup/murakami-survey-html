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

// 静的ファイルの配信
app.use(express.static(__dirname));

// プロキシエンドポイント
app.post('/api/submit', async (req, res) => {
  try {
    console.log('受信データ:', req.body);
    
    const gasUrl = process.env.GAS_URL || 'https://script.google.com/macros/s/AKfycbyQ3lNZD8-Qc9i748yBAH-N6OqmGdhbkLXnBYPJhM0tMQcqqI7sjJDh_KA-HgXIb91Pyw/exec';
    
    const response = await fetch(gasUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        uid: req.body.uid,
        condition: req.body.condition,
        method: req.body.method,
        payload: JSON.stringify(req.body.payload)
      })
    });
    
    const text = await response.text();
    console.log('GAS応答:', text);
    
    // GASの応答をそのまま返す
    res.status(response.status).send(text);
  } catch (err) {
    console.error('エラー:', err);
    res.status(500).json({ error: String(err) });
  }
});

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
