const { google } = require('googleapis');
const nodemailer = require('nodemailer');

const CLIENT_ID =
	'343857138441-8aci9lvj00r62qqehti6tb249dkq9p75.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN =
	'1//04fQFB14yQCeYCgYIARAAGAQSNwF-L9IrSvU1QZrZq9wuP2CfSjNUEPQV777F3Na34N2ok_FcODEt7Vyu3JUPeD42VdBMf1vQ5zE';

const oAuth2Client = new google.auth.OAuth2(
	CLIENT_ID,
	CLIENT_SECRET,
	REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(useremail, code) {
	try {
		const accessToken = await oAuth2Client.getAccessToken();
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				type: 'OAuth2',
				user: 'certifiedcoder101@gmail.com',
				clientId: CLIENT_ID,
				clientSecret: CLIENT_SECRET,
				refreshToken: REFRESH_TOKEN,
				accessToken: accessToken,
			},
		});

		const mailOptions = {
			from: 'UAS <certifiedcoder101@gmail.com>',
			to: useremail,
			subject: 'Account Verification Code',
			text: `Your 6-digit verification code ${code}`,
			html: `<h4>Your 6-digit verification code ${code}</h4>`,
		};

		const result = await transporter.sendMail(mailOptions);
		return result.messageId;
	} catch (error) {
		console.error(error);
		return error;
	}
}

module.exports = sendMail;
