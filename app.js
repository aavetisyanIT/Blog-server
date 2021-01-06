const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

//connect to mongodb
const dbURI =
	'mongodb+srv://admin:database1234@myblogs.tptfc.mongodb.net/<myBlogs>?retryWrites=true&w=majority';
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

app.set('view engine', 'ejs');

//middleware and static files
app.use('/public', express.static('public'));
app.use(morgan('dev'));

app.get('/', (req, res) => {
	const blogs = [
		{
			title: 'Yoshi finds eggs',
			snippet: 'Lorem ipsum dolor sit amet consectetur',
		},
		{
			title: 'Mario finds stars',
			snippet: 'Lorem ipsum dolor sit amet consectetur',
		},
		{
			title: 'How to defeat bowser',
			snippet: 'Lorem ipsum dolor sit amet consectetur',
		},
	];
	res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
	res.render('about', { title: 'About' });
});
app.get('/blogs/create', (req, res) => {
	res.render('create', { title: 'Create new Blog' });
});

//404 page
app.use((req, res) => {
	res.status(404).render('404', { title: '404' });
});
