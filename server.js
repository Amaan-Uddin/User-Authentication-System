require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mime = require('mime');
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const connectDB = require('./config/dbConn');

const authRouter = require('./routes/auth');
const mainRouter = require('./routes/main');

PORT = process.env.PORT || 3000;

connectDB();

// set the views engine to ejs
app.set('view engine', 'ejs');
// use cookieParser to parse cookie to the client request object
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
// enable use of static files in express (i.e. scripts,styles)
app.use(express.static(path.join(__dirname, 'public')));
// use method override to send PUT and DELETE request
app.use(methodOverride('_method'));

// use a middleware that checks for the extention and sets a proper content-type in the header
app.use((req, res, next) => {
	if (req.url.endsWith('.js')) {
		res.setHeader('Content-Type', mime.getType(req.url));
	}
	next();
});

app.get('/', (req, res) => {
	const option = {
		sign: 'sign-up',
		log: 'log-in',
	};
	res.render('index', { option: option });
});

app.use('/auth', authRouter);
app.use('/main', mainRouter);

mongoose.connection.once('open', () => {
	console.log('Connected to DB');
	app.listen(PORT, console.log(`Server running on port ${PORT}`));
});
