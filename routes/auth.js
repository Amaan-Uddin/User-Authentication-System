const express = require('express');
const router = express.Router();

// controllers
const signUser = require('../controllers/signUser');
const logUser = require('../controllers/logUser');
const forgotPassword = require('../controllers/forgotPassword');
const confirmCode = require('../controllers/confirmCode');
const resetPassword = require('../controllers/resetPassword');

// middleware
const checkInfo = require('../middleware/checkInfo');
const resendOTP = require('../middleware/resendOTP');

// handle GET requests
router.get('/sign', (req, res) => {
	res.render('pages/sign');
});
router.get('/log', checkInfo, (req, res) => {
	res.render('pages/log');
});
router.get('/forgot', (req, res) => {
	res.render('pages/forgot');
});
router.get('/confirm/:email', (req, res) => {
	res.render('pages/confirm', { email: req.params.email });
});
router.get('/resend/:email', resendOTP, forgotPassword);
router.get('/reset/:email', (req, res) => {
	res.render('pages/reset', { email: req.params.email });
});

// handle POST request
router.post('/sign', signUser);
router.post('/log', logUser);
router.post('/forgot', forgotPassword);
router.post('/confirm/:email', confirmCode);

// handle PUT request
router.put('/reset/:email', resetPassword);

module.exports = router;
