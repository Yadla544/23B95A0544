const express = require('express');
const router = express.Router();
const controller = require('../controller/shorturl.controller');
const logger = require('../middleware/logger.middleware');

router.post('/shorturls', logger, controller.createShort);
router.get('/shorturls/:shortcode', logger, controller.getStats);

module.exports = router;
router.get('/shorturls', logger, controller.getAllShorts);
router.delete('/shorturls/:shortcode', logger, controller.deleteShort);
router.put('/shorturls/:shortcode', logger, controller.updateShort);
router.get('/:shortcode', logger, controller.redirectShort);
router.get('/', logger, (req, res) => {
  res.status(200).json({ message: 'Welcome to the URL Shortener API' });
});
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});
router.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});
router.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.originalUrl}`);
  next();
});
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use('/api', router);
router.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.originalUrl}`);
  next();
});