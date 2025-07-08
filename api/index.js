// api/index.js
export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
    <h2>✅ QR Code API is live</h2>
    <p>Try: <code>/api/generate?data=HelloWorld</code></p>
  `);
}
