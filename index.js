import express from 'express';
import cors from 'cors';
import QRCode from 'qrcode';
import axios from 'axios';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// 👇 Optional: Shorten long text or URL using TinyURL
async function shortenIfLong(data) {
  if (data.length > 100 && data.startsWith('http')) {
    try {
      const response = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(data)}`);
      return response.data; // Shortened URL
    } catch (error) {
      console.warn('TinyURL failed. Using original data.');
    }
  }
  return data;
}

// 📌 Route to generate QR code
app.get('/generate', async (req, res) => {
  let { data } = req.query;
  if (!data) return res.status(400).send('Missing data');

  try {
    // ⏳ Shorten if needed
    data = await shortenIfLong(data);

    // 🧠 Generate simplified QR code
    const buffer = await QRCode.toBuffer(data, {
  errorCorrectionLevel: 'L', // lowest (simplest)
  scale: 6,                  // larger blocks
  margin: 1                  // minimal white border
});


    res.setHeader('Content-Type', 'image/png');
    res.send(buffer);
  } catch (err) {
    console.error('QR Generation Error:', err);
    res.status(500).send('Failed to generate QR');
  }
});

app.listen(PORT, () => {
  console.log(`✅ QR Backend running at http://localhost:${PORT}`);
});
