const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const ERS_API = 'https://www.ersapi.com/api/v1/inventory/getInventoryItems'; // Example endpoint, adjust if needed
const API_KEY = process.env.ERS_API_KEY;
const API_TOKEN = process.env.ERS_API_TOKEN;

app.get('/api/products', async (req, res) => {
  try {
    const response = await fetch(ERS_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        key: API_KEY,
        token: API_TOKEN,
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching ERS products:', error);
    res.status(500).json({ error: 'Unable to fetch products from ERS' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`ERS Middleware running on port ${port}`));