require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');
const redditRouter = require('./routes/reddit');
const torrentRouter = require('./routes/torrent');
const tmdbRouter = require('./routes/tmdb');
const wallHavenRouter = require('./routes/wallhaven');
const discogsRouter = require('./routes/discogs');
const loginRouter = require('./routes/login');
const auth = require('./services/auth');
const app = express();
const jobs = require('./jobs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(auth);

app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/reddit', redditRouter);
app.use('/torrent', torrentRouter);
app.use('/tmdb', tmdbRouter);
app.use('/wallhaven', wallHavenRouter);
app.use('/discogs', discogsRouter);
app.use('/login', loginRouter);

module.exports = app;
