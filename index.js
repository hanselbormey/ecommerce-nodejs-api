const startupDebugger = require('debug')('app:startup');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const logger = require('./middleware/logger');
const express = require('express');
const app = express();

const courses = require('./routes/courses');
const genres = require('./routes/genres');
const products = require('./routes/products');
const users = require('./routes/users');
const home = require('./routes/home');

const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.DATABASE_CONNECTION)
.then(() => console.log('Connected successfuly to Mongodb'))
.catch((error) => console.log('Failed to connect with Mongodb', error));

app.set('view engine', 'pug');
app.set('views', './views'); // default

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

app.use(logger);
app.use('/', home);
app.use('/api/courses', courses);
app.use('/api/genres', genres);
app.use('/api/products', products);
app.use('/api/users', users);

//configuration
console.log('Application Name: ' + process.env.APP_NAME);
console.log('env: ' + process.env.NODE_ENV)

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
 }

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
