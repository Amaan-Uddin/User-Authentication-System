const jwt = require('jsonwebtoken');
const tokens = require('../config/tokens');

const verifyRefresh = (req, res) => {
	const email = req.params.email;
	const cookie = req.cookies;
	if (!cookie?.refresh) {
		return res.redirect('/auth/log');
	}
	const refreshToken = cookie.refresh;
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
		if (err) return res.sendStatus(403);
		const accessToken = tokens.accessToken(decode.email);
		res.cookie('access', accessToken, { httpOnly: true });
		res.redirect(`/main/${email}`);
	});
};

module.exports = verifyRefresh;
