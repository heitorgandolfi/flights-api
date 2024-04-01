import { Elysia } from "elysia";
import swagger from "@elysiajs/swagger";

import { flightsRoutes } from "./routes/flights";
import { bookingsRoutes } from "./routes/bookings";
import { passengersRoutes } from "./routes/passengers";

new Elysia()
  .use(swagger())
  .use(flightsRoutes)
  .use(passengersRoutes)
  .use(bookingsRoutes)
  .listen(3001, () => {
    console.log("Server is running on port 3001");
  });
