const User = require('../model/User');
const bcrypt = require('bcrypt');

const resetPassword = async (req, res) => {
	const email = req.params.email;
	if (!email) {
		return res.sendStatus(403);
	}

	const { password, confirmPass } = req.body;
	if (!password || !confirmPass) {
		return res.sendStatus(400);
	}

	let hashPassword;

	try {
		if (confirmPass === password) {
			hashPassword = await bcrypt.hash(confirmPass, 10);
		}

		await User.updateOne(
			{ email: email },
			{ $set: { password: hashPassword } }
		);

		res.clearCookie('enc', { httpOnly: true });
		res.status(201).redirect(`/main/${email}`);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
};

module.exports = resetPassword;
