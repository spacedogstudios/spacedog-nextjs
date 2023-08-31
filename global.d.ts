import 'jest-fetch-mock';
import { D1Database } from "@miniflare/d1";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      DB: D1Database;
      NEXT_PUBLIC_IMAGE_SERVER: string;
      MAIL_API_KEY: string;
      MAIL_API_URL: string;
      MAIL_TO: string;
    }
  }
}

type Nullable<T> = T | null;
