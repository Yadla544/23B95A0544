const service = require('../service/shorturl.service');

exports.createShort = (req, res) => {
  try {
    const data = service.createShortURL(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getStats = (req, res) => {
  try {
    const data = service.getShortURL(req.params.shortcode);
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
exports.getAllShorts = (req, res) => {
  try {
    const data = service.getAllShortURLs();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.deleteShort = (req, res) => {
  try {
    const { shortcode } = req.params;
    if (!shortcode) {
      return res.status(400).json({ message: 'Shortcode is required' });
    }
    service.deleteShortURL(shortcode);
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
exports.updateShort = (req, res) => {
  try {
    const { shortcode } = req.params;
    if (!shortcode) {
      return res.status(400).json({ message: 'Shortcode is required' });
    }
    const data = service.updateShortURL(shortcode, req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
exports.redirectShort = (req, res) => {
  try {
    const { shortcode } = req.params;
    if (!shortcode) {
      return res.status(400).json({ message: 'Shortcode is required' });
    }
    const data = service.getShortURL(shortcode);
    if (data.expiry < new Date()) {
      return res.status(410).json({ message: 'Short URL has expired' });
    }
    res.redirect(data.url);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
exports.getShortLink = (req, res) => {
  try {
    const { shortcode } = req.params;
    if (!shortcode) {
      return res.status(400).json({ message: 'Shortcode is required' });
    }
    const data = service.getShortURL(shortcode);
    res.status(200).json({
      shortLink: `http://localhost:3000/${shortcode}`,
      expiry: data.expiry
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.getShortLinkByCode = (req, res) => {    
    
  try {
    const { code } = req.params;
    if (!code) {
      return res.status(400).json({ message: 'Code is required' });
    }
    const data = service.getShortURL(code);
    res.status(200).json({
      shortLink: `http://localhost:3000/${code}`,
      expiry: data.expiry
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

exports.getShortLinkByUrl = (req, res) => {
  try {
    const { url } = req.params;
    if (!url) {
      return res.status(400).json({ message: 'URL is required' });
    }
    const data = service.getShortURLByUrl(url);
    res.status(200).json({
      shortLink: `http://localhost:3000/${data.code}`,
      expiry: data.expiry
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.getShortLinkByUrlAndCode = (req, res) => {
  try {
    const { url, code } = req.params;
    if (!url || !code) {
      return res.status(400).json({ message: 'URL and Code are required' });
    }
    const data = service.getShortURLByUrlAndCode(url, code);
    res.status(200).json({
      shortLink: `http://localhost:3000/${data.code}`,
      expiry: data.expiry
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};