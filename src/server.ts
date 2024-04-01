import { Elysia } from "elysia";
import { flightsRoutes } from "./routes/flights";
import swagger from "@elysiajs/swagger";

new Elysia()
  .use(swagger())
  .use(flightsRoutes)
  .listen(3001, () => {
    console.log("Server is running on port 3001");
  });
