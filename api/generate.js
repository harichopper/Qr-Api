import QRCode from 'qrcode';

export default async function handler(req, res) {
  const { data } = req.query;

  if (!data) {
    return res.status(400).send('Missing data');
  }

  try {
    const buffer = await QRCode.toBuffer(data, {
      errorCorrectionLevel: 'L',
      scale: 6,
      margin: 1,
    });

    res.setHeader('Content-Type', 'image/png');
    res.status(200).send(buffer);
  } catch (err) {
    res.status(500).send('QR generation failed');
  }
}
