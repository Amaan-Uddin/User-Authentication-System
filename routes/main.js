const express = require('express');
const router = express.Router();
const verifyAccess = require('../middleware/verifyAccess');
const removeTokens = require('../middleware/removeTokens');

router.get('/logout', removeTokens, (req, res) => {
	res.redirect('/');
});
router.get('/:email', (req, res) => {
	res.render('main', { email: req.params.email });
});
router.get('/:email/access', verifyAccess, (req, res) => {
	res.render('pages/access', { email: req.params.email });
});
router.get(
	'/:email/remove',
	(req, res, next) => {
		const cookie = req.cookies;
		if (cookie?.access) {
			res.clearCookie('access', { httpOnly: true });
			return next();
		}
		next();
	},
	(req, res) => {
		res.redirect(`/main/${req.params.email}`);
	}
);

module.exports = router;
