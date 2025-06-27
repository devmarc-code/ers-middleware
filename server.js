const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const ERS_API_URL = 'https://jumpinjoypartyrentals.ourers.com/api/inventory/getInventoryItems';
const API_KEY = process.env.ERS_API_KEY;
const API_TOKEN = process.env.ERS_API_TOKEN;

app.get('/api/products', async (req, res) => {
  try {
    const response = await fetch(ERS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: API_KEY,
        token: API_TOKEN,
      }),
    });

    const text = await response.text();

    // Log raw response to understand what’s happening
    console.log('ERS raw response:', text);

    try {
      const data = JSON.parse(text);

      if (data.error) {
        console.error('ERS API Error:', data.error);
        return res.status(500).json({ error: data.error });
      }

      return res.json(data);
    } catch (err) {
      console.error('Failed to parse JSON:', err.message);
      return res.status(500).json({
        error: 'ERS did not return valid JSON',
        raw: text,
      });
    }
  } catch (error) {
    console.error('Error fetching ERS products:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from ERS' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`ERS middleware running on port ${port}`);
});
