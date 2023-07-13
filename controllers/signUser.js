const User = require('../model/User');
const bcrypt = require('bcrypt');
const tokens = require('../config/tokens');

const signUser = async (req, res) => {
	const { email, password } = req.body;
	console.log(req.body);
	if (!email || !password) {
		return res.sendStatus(400);
	}

	// check for duplicate user
	const duplicateUser = await User.findOne({ email: email });
	if (duplicateUser) {
		return res.sendStatus(406);
	}

	try {
		const hashPassword = await bcrypt.hash(password, 10);

		const accessToken = tokens.accessToken(email);
		const refreshToken = tokens.refreshToken(email);

		const result = await User.create({
			email: email,
			password: hashPassword,
			refreshToken: refreshToken,
		});
		console.log(result);

		res.cookie('access', accessToken, {
			httpOnly: true,
			maxAge: 15 * 60 * 1000,
		});
		res.cookie('refresh', refreshToken, {
			httpOnly: true,
			maxAge: 1 * 60 * 60 * 1000,
		});

		res.status(201).redirect(`/main/${email}`);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
};

module.exports = signUser;
