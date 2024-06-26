import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import "reflect-metadata";
import { AuthRouter } from "./router/auth.router";
import { BookRouter } from "./router/book.router";
import { UserRouter } from "./router/user.router";


dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
app.use(cookieParser());
app.use(
  session({
    secret: process.env.COOKIE_SECRET as string,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cors());
app.use(express.json());
app.use("/api/users", UserRouter);
app.use("/api/auth/", AuthRouter);
app.use("/api/book/", BookRouter);
app.listen(PORT, () => {
  console.log(`listening on port: `, PORT);
});
