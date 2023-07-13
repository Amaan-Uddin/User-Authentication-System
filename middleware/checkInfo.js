const User = require('../model/User');
const jwt = require('jsonwebtoken');
const tokens = require('../config/tokens');

const checkInfo = async (req, res, next) => {
	const cookie = req.cookies;
	if (!cookie?.info) {
		console.log('no cookie');
		return next();
	}

	// if the cookie exist then get the encrypted info
	const encInfo = cookie.info;
	// now verify using jwt.verify

	jwt.verify(
		encInfo,
		process.env.REMEMBER_TOKEN_SECRET,
		async (err, decode) => {
			if (err) {
				console.log('error');
				return next();
			}
			const email = decode.userInfo.email;
			const password = decode.userInfo.password;

			const findUser = await User.findOne({ email: email, password: password });
			if (!findUser) {
				console.log(`${password}`);
				return next();
			}

			const accessToken = tokens.accessToken(email);
			const refreshToken = tokens.refreshToken(email);

			res.cookie('access', accessToken, {
				httpOnly: true,
			});
			res.cookie('refresh', refreshToken, {
				httpOnly: true,
				maxAge: 1 * 60 * 60 * 1000,
			});

			res.status(200).redirect(`/main/${email}`);
		}
	);
};

module.exports = checkInfo;
