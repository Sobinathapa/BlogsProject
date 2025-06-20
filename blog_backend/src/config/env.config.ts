import dotenv from "dotenv";
dotenv.config();

console.log(process.env.PORT);

import { cleanEnv, port, str } from "envalid";

const env = cleanEnv(process.env, {
  PORT: port(),
  DB_HOST: str(),
  DB_NAME: str(),
  DB_USER: str(),
  DB_PASSWORD: str(),
  DB_DIALECT: str(),
  JWT_SECRET: str(),
  GOOGLE_APP_PASSWORD: str(),
  GOOGLE_APP_EMAIL: str(),
});

export default env;
