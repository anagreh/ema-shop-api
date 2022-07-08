import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

//router
import indexRouter from './app.controller';
import { router as usersRouter } from './users';

//middleware
import { zodErrorHandler, endErrorHandler } from './middleware';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// error handler
app.use(zodErrorHandler);
app.use(endErrorHandler);

export default app;
