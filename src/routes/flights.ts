import { Elysia, t } from "elysia";
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

  app.post(
    "/flights",
    async (req) => {
      const data = req.body;
      await FlightsHandler.create(data);
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
);
