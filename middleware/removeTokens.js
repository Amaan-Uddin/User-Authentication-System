const removeTokens = (req, res, next) => {
	const cookie = req.cookies;
	if (cookie?.access || cookie?.refresh || cookie?.info) {
		res.clearCookie('access', { httpOnly: true });
		res.clearCookie('refresh', { httpOnly: true });
		res.clearCookie('info', { httpOnly: true });
		return next();
	}
	next();
};

module.exports = removeTokens;
