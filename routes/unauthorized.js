const express = require('express');
const router = express.Router();
const verifyRefresh = require('../controllers/refreshController');

router.get('/:email', (req, res) => {
	res.render('unauthorized', { email: req.params.email });
});
router.get('/:email/refresh', verifyRefresh);

module.exports = router;
