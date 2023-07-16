const User = require('../model/User');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const forgotPassword = async (req, res) => {
	const { email } = req.body;
	if (!email) {
		return res.sendStatus(400);
	}

	const findUser = await User.findOne({ email: email });
	if (!findUser) {
		return res.sendStatus(409);
	}

	try {
		// generate a random 6-digit integer
		const code = randomNumber(100000, 999999);

		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: {
				user: process.env.EMAIL_ADD,
				pass: process.env.PASSWORD,
			},
		});

		const mailOptions = {
			from: 'certifiedprogrammer101@gmail.com',
			to: findUser.email,
			subject: 'Verification Code',
			text: `Your verification code is ${code}`,
		};

		const info = await transporter.sendMail(mailOptions);

		// *** FOR TESTING ***
		console.log(code);

		console.log(`Message sent successfully: ${info.messageId}`);

		// create a hash
		const hashedCode = await bcrypt.hash(code.toString(), 10);

		// pass this encrypted code to our Cookie or Client Session
		res.cookie('enc', hashedCode, {
			httpOnly: true,
			maxAge: 5 * 60 * 60 * 1000,
		});

		res.redirect(`/auth/confirm/${email}`);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
};

const randomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

module.exports = forgotPassword;
