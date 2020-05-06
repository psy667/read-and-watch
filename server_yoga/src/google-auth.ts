import passport  from 'passport';
import { Strategy as GoogleTokenStrategy } from 'passport-google-token';
import dotenv from 'dotenv';
import path from "path";

const GoogleTokenStrategyCallback = (accessToken: any, refreshToken: any, profile: any, done: any) => {
    return done(null, {
        accessToken,
        refreshToken,
        profile,
    });
}
dotenv.config({path: path.resolve(__dirname,'..', '.env')})

passport.use(new GoogleTokenStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
}, GoogleTokenStrategyCallback));

export const authenticateGoogle = (req: any, res: any) => {
    return new Promise((resolve: any, reject: any) => {
        passport.authenticate('google-token', { session: false }, (err, data, info) => {
            if (err) reject(err);
            resolve({ data, info });
        })(req, res);
    });
}