require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');
const redditRouter = require('./routes/reddit');
const torrentRouter = require('./routes/torrent');
const tmdbRouter = require('./routes/tmdb');
const wallHavenRouter = require('./routes/wallhaven');
const discogsRouter = require('./routes/discogs');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/reddit', redditRouter);
app.use('/torrent', torrentRouter);
app.use('/tmdb', tmdbRouter);
app.use('/wallhaven', wallHavenRouter);
app.use('/discogs', discogsRouter);

module.exports = app;
