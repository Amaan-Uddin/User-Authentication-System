const User = require('../model/User');
const bcrypt = require('bcrypt');
const tokens = require('../config/tokens');

const logUser = async (req, res) => {
	let rememberFlag = 1;
	const { email, password } = req.body;
	if (!email || !password) {
		return res.sendStatus(400);
	}

	// find user
	const findUser = await User.findOne({ email: email });
	if (!findUser) {
		return res.sendStatus(409);
	}

	// check for the remember cookie
	const cookie = req.cookies;
	if (!cookie?.remember) {
		rememberFlag = 0;
	}

	try {
		const compHash = await bcrypt.compare(password, findUser.password);
		if (!compHash) {
			return res.redirect('/auth/log');
		}

		const accessToken = tokens.accessToken(email);
		const refreshToken = tokens.refreshToken(email);

		if (rememberFlag) {
			res.clearCookie('remember');
			res.cookie('info', tokens.rememberToken(email, findUser.password), {
				httpOnly: true,
				maxAge: 24 * 60 * 60 * 1000,
			});
		}

		res.cookie('access', accessToken, {
			httpOnly: true,
		});

		res.cookie('refresh', refreshToken, {
			httpOnly: true,
			maxAge: 1 * 60 * 60 * 1000,
		});

		res.status(200).redirect(`/main/${email}`);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
};

module.exports = logUser;
