import { Elysia, t } from "elysia";
import { BookingsHandler } from "../handler/bookings";

export const bookingsRoutes = (app: Elysia) => (
  app.get("/bookings", async () => {
    const bookings = await BookingsHandler.getAll();

    return bookings;
  }),

  app.get("/bookings/:id", async (req) => {
    const { id } = req.params;
    const booking = await BookingsHandler.getById(parseInt(id));

    return booking;
  }),

  app.post("/bookings", async (req) => {
    const data = req.body;
    await BookingsHandler.create(data);
  }, {
    body: t.Object({
      flightId: t.Number(),
      userId: t.Number(),
      seatNumber: t.String(),
    })
  }),

  app.delete("/bookings/:id", async (req) => {
    const { id } = req.params;
    await BookingsHandler.deleteById(parseInt(id));
  })
)