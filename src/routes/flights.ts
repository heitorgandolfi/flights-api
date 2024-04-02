import { Elysia, t } from "elysia";

import { UserRole } from "../dtos/users";
import { FlightsHandler } from "../handler/flights";

export const flightsRoutes = (app: Elysia) => (
  app.get("/flights", async () => {
    const flights = await FlightsHandler.getAll();

    return flights;
  }),

  app.get("/flights/:id", async (req) => {
    const { id } = req.params;
    const flight = await FlightsHandler.getById(parseInt(id));

    return flight;
  }),

  app.guard({
    beforeHandle: ({ headers }) => {
      const role = headers.role as UserRole | null;

      if (!role) return new Response(null, { status: 401 });

      if (role !== UserRole.ADMIN) {
        return new Response(null, { status: 403 });
      }

    }
  }, app => (
    app.post("/flights", async (req) => {
      const data = req.body;
      await FlightsHandler.create(data);
      return new Response(null, { status: 201 });
    },
      {
        body: t.Object({
          origin: t.String(),
          destination: t.String(),
          airline: t.String(),
          price: t.Number(),
          departure: t.String(),
          arrival: t.String(),
        }),
      }

    ),
    
    app.delete("/flights/:id", async (req) => {
      const { id } = req.params;
      await FlightsHandler.deleteById(parseInt(id));
    })
  ))
);
