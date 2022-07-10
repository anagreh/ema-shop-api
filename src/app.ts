import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { NotFound } from 'http-errors';
import passport from 'passport';
import cors from 'cors';
import { appDataBase } from './db';

//router
import indexRouter from './app.controller';
import { router as usersRouter } from './users';
import { router as itemsRouter } from './items';
import { router as authRouter } from './auth';

//middleware
import { zodErrorHandler, endErrorHandler } from './middleware';

import { localStrategy } from './auth/strategy';

passport.use(localStrategy);

const app = express();

appDataBase.connect();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/items', itemsRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
  next(new NotFound());
});

// error handler
app.use(zodErrorHandler);
app.use(endErrorHandler);

export default app;
