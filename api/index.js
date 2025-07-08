// api/index.js
export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
    <h2>✅ QR Code API is Live</h2>
    <p>Use <code>/api/generate?data=YourTextHere</code> to generate a QR code.</p>
    <p>Example: <a href="/api/generate?data=Hello">/api/generate?data=Hello</a></p>
  `);
}
