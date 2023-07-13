const jwt = require('jsonwebtoken');

const accessToken = (email) => {
	return jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET);
};
// here we are not including the expiration date for our accessToken
// but in a real world application it is required to specify an appropriate expiration time

const refreshToken = (email) => {
	return jwt.sign({ email: email }, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: '1h',
	});
};

const rememberToken = (email, password) => {
	return jwt.sign(
		{
			userInfo: {
				email: email,
				password: password,
			},
		},
		process.env.REMEMBER_TOKEN_SECRET,
		{ expiresIn: '1d' }
	);
};

module.exports = { accessToken, refreshToken, rememberToken };
