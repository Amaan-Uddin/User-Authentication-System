const resendMail = async (req, res, next) => {
	const cookie = req.cookies;
	if (cookie?.enc) {
		res.clearCookie('enc', { httpOnly: true });
		// after clearing the cookie set the email for the request object's body
		req.body.email = req.params.email;
		return next();
	}
	// set the email for the request object's body
	req.body.email = req.params.email;
	next();
};

module.exports = resendMail;
