const express = require('express');
const app = express();
app.use(express.json({ limit: '1mb' }));

const API_KEY = process.env.ANTHROPIC_API_KEY;
const PORT = process.env.PORT || 3001;

if (!API_KEY) {
  console.error('FATAL: ANTHROPIC_API_KEY not set');
  process.exit(1);
}

app.post('/api/messages', async (req, res) => {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (err) {
    console.error('Proxy error:', err.message);
    res.status(502).json({ error: 'upstream_error', message: err.message });
  }
});

app.get('/healthz', (_, res) => res.json({ ok: true }));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`vibeddit-backend listening on :${PORT}`);
});
