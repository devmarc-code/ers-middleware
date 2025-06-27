import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const ERS_API_KEY = process.env.ERS_API_KEY;
const ERS_API_TOKEN = process.env.ERS_API_TOKEN;
const ERS_ITEMINFO_URL = 'https://jumpinjoypartyrentals.ourers.com/publicapi/read/iteminfo/';

app.get('/api/iteminfo/:itemId', async (req, res) => {
  const itemId = req.params.itemId;

  try {
    const response = await fetch(ERS_ITEMINFO_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        key: ERS_API_KEY,
        token: ERS_API_TOKEN,
        ItemID: itemId
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error('ERS Error:', data.error);
      return res.status(400).json({ error: data.error });
    }

    res.json(data);
  } catch (err) {
    console.error('Fetch Error:', err.message);
    res.status(500).json({ error: 'Failed to connect to ERS' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
