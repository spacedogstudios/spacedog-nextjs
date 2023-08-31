require('jest-fetch-mock').enableMocks();

const SQL_PATH = "src/migrations/schema.sql";

const up = async (db: D1Database, sqlPath: string): Promise<void> => {
  const fs = require("node:fs");
  const queries = fs
    .readFileSync(sqlPath)
    .toString()
    .replace(/(\r\n|\n|\r)/gm, " ") // remove newlines
    .replace(/\s+/g, " ") // excess white space
    .split(";") // split into all statements
    .map(Function.prototype.call, String.prototype.trim)
    .filter(function (el: string) {
      return el.length != 0;
    });

  // run the migration
  for (const sql of queries) {
    try {
      await db.prepare(sql).run();
    } catch (e: any) {
      console.error(e.message);
    }
  }
};

module.exports = async () => {
  const { D1Database, D1DatabaseAPI } = require("@miniflare/d1");
  const sqliteDb = require("better-sqlite3")(":memory:");
  const db = new D1Database(new D1DatabaseAPI(sqliteDb)) as D1Database;
  await up(db, SQL_PATH);
  // Double assertion required because linter expects all properties of odeJS.ProcessEnv to be string
  process.env = { ...process.env, DB: db } as unknown as NodeJS.ProcessEnv;
};
