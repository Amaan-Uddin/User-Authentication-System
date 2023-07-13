const express = require('express');
const router = express.Router();

router.get('/:email', (req, res) => {
	res.render('main', { userId: req.params.email });
});

module.exports = router;
