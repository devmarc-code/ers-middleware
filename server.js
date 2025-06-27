import express from 'express';
import fetch from 'node-fetch'; // If using ESM. Use 'node-fetch@2' or install latest.
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Load ERS credentials from environment or hardcode for testing
const ERS_API_KEY = process.env.ERS_API_KEY || 'your-api-key';
const ERS_API_TOKEN = process.env.ERS_API_TOKEN || 'your-api-token';

app.use(express.json());

// API route to get product info by ItemID
app.get('/api/iteminfo/:itemId', async (req, res) => {
  const itemId = req.params.itemId;

  try {
    const response = await fetch('https://jumpinjoypartyrentals.ourers.com/publicapi/read/iteminfo/', {
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
      console.error('ERS API Error:', data.error);
      return res.status(500).json({ error: data.error });
    }

    res.json(data);
  } catch (err) {
    console.error('Fetch error:', err.message);
    res.status(500).json({ error: 'Failed to contact ERS' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
