// db 
import { Database, PostgresConnector } from "./deps.ts";
import { config } from "./deps.ts";

const env = config();

// SQLite3Connector, MySQLConnector, PostgresConnector...
const connector = new PostgresConnector({
    database: env.DB_NAME,
    host: env.DB_HOST,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    port: Number(env.DB_PORT),
});

// If you need debug logs, set `debug` to `true`
export const db = new Database({connector, debug: env.debug === "true"});