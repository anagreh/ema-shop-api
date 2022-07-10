import { UserModel } from './../../users/models/User';
import { Strategy, VerifyFunction } from 'passport-local';
import bcrypt from 'bcrypt';

const verifyFunction: VerifyFunction = async (email, password, done) => {
  try {
    const user = await UserModel.findOne({ email }, '+password').exec();
    if (!user) return done(null, false);

    // check password
    const comparison = await bcrypt.compare(password, user.password);
    if (comparison) done(user);
    done(null, false);
  } catch (error) {
    done(error);
  }
};

export const localStrategy = new Strategy(
  { session: false, usernameField: 'email' },
  verifyFunction,
);
