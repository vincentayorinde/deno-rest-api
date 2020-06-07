import { Application } from "https://deno.land/x/oak/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

import router from "./routes.ts";
const port = config().PORT || 5000;
const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server is running on port ${port}`);

app.listen({ port: +port });
