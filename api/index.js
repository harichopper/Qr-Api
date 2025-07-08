export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
    <h2>✅ QR Code API is Live</h2>
    <p>Use <code>/api/generate?data=YourText</code> to get a QR image.</p>
  `);
}
