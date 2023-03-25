const express =require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

//  @ROUTE      /api/url/shorten
//  @DESC       CRETE SHORT URL
router.post('api/url/shorten', urlController.shortenUrl);
router.get('/:code', urlController.getLongUrl);

module.exports = router;