const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const ERS_API_URL = 'https://jumpinjoypartyrentals.ourers.com/api/inventory/getInventoryItems'; // Example endpoint, adjust if needed
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
        key: 31886fa9692619091af6968b043d9968ae18516858c665f491721d26381c96472590de1923a45cf9c87e0f9213024e838bcfdd8372229be9e29fee5c49bd2112$e5688d1b,
        token: jumpinjoypartyrentals_23b2dd1533b32551f0f405927d23f9c9,
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
