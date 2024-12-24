import express, { json, urlencoded } from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import "./config/passport.config";

dotenv.config();

const app = express();

//Middleware
const corsOptions = {
  orin: ["http://localhost:3000"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(json({ limit: "100mb" }));
app.use(urlencoded({ limit: "100mb", extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 60000 * 60, // 1 heure
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

//Listen app
const PORT = process.env.PORT || 7001;
export const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
