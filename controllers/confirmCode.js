const bcrypt = require('bcrypt');

const confirmCode = async (req, res) => {
	const { code } = req.body;
	if (!code) {
		return res.sendStatus(400);
	}

	// check for cookies
	const cookie = req.cookies;
	if (!cookie?.enc) {
		return res.status(403).send('The OTP has expired');
	}

	// get the encrypted code form the cookie
	const hashCode = cookie.enc;

	// confirm the code sent
	try {
		const verifyCode = await bcrypt.compare(code, hashCode);
		if (verifyCode) {
			res.clearCookie('enc', { httpOnly: true });
			return res.redirect(`/auth/reset/${req.params.email}`);
		}
		res.status(403).send('The OTP given is incorrect.');
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
};

module.exports = confirmCode;
