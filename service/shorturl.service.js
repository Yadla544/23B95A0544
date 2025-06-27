const shortLinks = new Map();
const generateCode = require('../utils/generateCode');

exports.createShortURL = ({ url, validity, shortcode }) => {
  const expiry = new Date(Date.now() + (validity || 30) * 60000);
  const code = shortcode || generateCode();

  if (shortLinks.has(code)) {
    throw new Error('Shortcode already exists');
  }

  shortLinks.set(code, { url, expiry });
  return {
    shortLink: `http://localhost:3000/${code}`,
    expiry
  };
};

exports.getShortURL = (code) => {
  const data = shortLinks.get(code);
  if (!data) throw new Error('Shortcode not found');

  return data;
};

exports.getAllShortURLs = () => {
  const urls = [];
  for (const [code, data] of shortLinks.entries()) {
    urls.push({
      code,
      ...data
    });
  }
  return urls;
}
