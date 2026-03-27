export default async function handler(req, res) {
  const { id } = req.query;
  if (!id || !/^\d+$/.test(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }
  try {
    const response = await fetch(
      `https://images.fotmob.com/image_resources/playerimages/${id}.png`,
      { headers: { 'User-Agent': 'Mozilla/5.0' } }
    );
    if (!response.ok) return res.status(404).end();
    const buffer = await response.arrayBuffer();
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(Buffer.from(buffer));
  } catch(e) {
    res.status(500).end();
  }
}
