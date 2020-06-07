import { config } from 'https://deno.land/x/dotenv/mod.ts';

const dbConn = {
    user: config().DB_USER,
    database: config().DB_NAME,
    password: config().DB_PASSWORD,
    hostname: config().DB_HOSTNAME,
    port: parseInt(config().DB_PORT)
};

export { dbConn };
