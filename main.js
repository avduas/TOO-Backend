const express = require('express');
const dotenv = require('dotenv');
const { askOpenRouter } = require('./api');
const cors = require ('cors')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

// app.get("/", (req,res) => {
//   res.send("Hello")
// })

app.post('/api/ask', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Missing message' });

  try {
    const reply = await askOpenRouter(message);
    res.json({ reply });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'API error' });
  }
});

app.listen(PORT, () => {
console.log(`Example app listening on port ${PORT}`)
});
