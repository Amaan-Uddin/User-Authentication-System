const jwt = require('jsonwebtoken');

const verifyAccess = (req, res, next) => {
	const cookie = req.cookies;
	if (!cookie?.access) {
		return res.redirect(`/unauthorized/${req.params.email}`);
	}
	const accessToken = cookie.access;

	jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
		if (err || decode.email !== req.params.email) {
			return res.sendStatus(403);
		}
		next();
	});
};

module.exports = verifyAccess;
