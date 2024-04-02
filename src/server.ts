import jwt from "jsonwebtoken";
import { Elysia } from "elysia";
import swagger from "@elysiajs/swagger";

import { authRoutes } from "./routes/auth";
import { usersRoutes } from "./routes/users";
import type { UserRole } from "./dtos/users";
import { flightsRoutes } from "./routes/flights";
import { bookingsRoutes } from "./routes/bookings";
import { swaggerConfig } from "./config/swagger/swaggerConfig";

interface TokenPayload {
  sub: string,
  role: UserRole
}

new Elysia()
  .use(swagger(swaggerConfig))
  .use(authRoutes)
  .guard({
    beforeHandle: ({ headers }) => {
      const token = headers.authorization;

      if (!token) {
        return new Response(null, { status: 401 });
      }

      try {
        const tokenValue = token.split(" ");

        if (process.env.JWT_SECRET === undefined) {
          throw new Error("Error on sync enviroment variables");
        }

        const decoded = jwt.verify(tokenValue[1], process.env.JWT_SECRET) as TokenPayload;

        if (!decoded) return new Response(null, { status: 401 });

        headers.role = decoded.role;
      } catch (error) {
        return new Response(null, { status: 401 });
      }
    }
  }, app => (
    app.use(flightsRoutes),
    app.use(usersRoutes),
    app.use(bookingsRoutes)
  ))
  .listen(3001, () => {
    console.log("Server is running on port 3001");
  });
