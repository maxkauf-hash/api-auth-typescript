import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { Users } from "types";
import { CrudModel } from "../models/CrudModel";
import { AuthModel } from "../models/AuthModel";
import { comparePassword } from "../utils/auth";

const crud = new CrudModel<Users>("users");

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await AuthModel.findOneByEmail(email);
        if (!user) return done(null, false, { message: "User not found" });

        const isMatch = await comparePassword(password, user.password);

        if (isMatch) return done(null, user);
        else return done(null, false, { message: "Invalid password" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user: Users, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await crud.findOne(id);
    if (user)
      return done(null, { id: user.id, email: user.email, role: user.role });
  } catch (error) {
    done(error);
  }
});
