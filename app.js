const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes');

//connect to mongodb
const dbURI =
	'mongodb+srv://admin:database1234@myblogs.tptfc.mongodb.net/myBlogs?retryWrites=true&w=majority';
mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => {
		//first connect to DB
		console.log('connected to db');
		//then listen for requests
		app.listen(3000, () => {
			console.log('Server is running on port 3000');
		});
	})
	.catch((err) => console.log(err));

//middleware and static files
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//routes
app.get('/', (req, res) => {
	res.redirect('/blogs');
});

app.get('/about', (req, res) => {
	res.render('about', { title: 'About' });
});

//blog routes
app.use('/blogs', blogRoutes);

//404 page
app.use((req, res) => {
	res.status(404).render('404', { title: '404' });
});
