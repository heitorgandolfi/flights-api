import { Elysia, t } from "elysia";
import { PassengersHandler } from "../handler/passengers";

export const passengersRoutes = (app: Elysia) =>
  app
    .get("/passengers", async () => {
      const passengers = await PassengersHandler.getAll();

      return passengers;
    })
    .get("/passengers/:id", async (req) => {
      const { id } = req.params;
      const passenger = await PassengersHandler.getById(parseInt(id));

      return passenger;
    })
    .post(
      "/passengers",
      async (req) => {
        const { email, name } = req.body;
        await PassengersHandler.create({ email, name });
      },
      {
        body: t.Object({
          email: t.String(),
          name: t.String(),
        }),
      }
    )
    .delete("/passenger/:id", async (req) => {
      const { id } = req.params;
      await PassengersHandler.deleteById(parseInt(id));
    });
