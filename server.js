const ERS_API_URL = 'https://jumpinjoypartyrentals.ourers.com/api/inventory/getInventoryItems';

app.get('/api/products', async (req, res) => {
  try {
    const response = await fetch(ERS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        key: API_KEY,
        token: API_TOKEN,
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error('ERS API Error:', data.error);
      return res.status(500).json({ error: data.error });
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching ERS products:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from ERS' });
  }
});
