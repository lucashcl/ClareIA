import { Elysia } from "elysia";
import { summariesRoute } from "./routes/summariesRoute";

const app = new Elysia({
  prefix: "/api",
})
  .get("/", () => "Hello Elysia")
  .use(summariesRoute)
  .listen(8000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
