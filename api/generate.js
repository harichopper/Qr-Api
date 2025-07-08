// api/generate.js
import QRCode from 'qrcode';
import axios from 'axios';

export default async function handler(req, res) {
  const { data } = req.query;

  if (!data) {
    return res.status(400).send('Missing `data` parameter');
  }

  // Optional: TinyURL shortening for long URLs
  let finalData = data;
  if (data.length > 100 && data.startsWith('http')) {
    try {
      const response = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(data)}`);
      finalData = response.data;
    } catch (err) {
      console.warn('TinyURL failed. Using original URL.');
    }
  }

  try {
    const buffer = await QRCode.toBuffer(finalData, {
      errorCorrectionLevel: 'L',
      scale: 6,
      margin: 1,
    });

    res.setHeader('Content-Type', 'image/png');
    res.status(200).send(buffer);
  } catch (err) {
    console.error('QR Generation Error:', err);
    res.status(500).send('QR generation failed
