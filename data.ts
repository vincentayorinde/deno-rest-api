import { Client } from "https://deno.land/x/postgres/mod.ts";
import { dbConn } from './config.ts';

// Initialize Postgres Client
export const client = new Client(dbConn)

