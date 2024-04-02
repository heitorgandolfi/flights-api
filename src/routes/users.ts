import { Elysia, t } from "elysia";

import { UserRole } from "../dtos/users";
import { UsersHandler } from "../handler/users";

export const usersRoutes = (elysia: Elysia) => (

  elysia.guard({
    beforeHandle: ({ headers }) => {
      const role = headers.role as UserRole | null;

      if (!role) return new Response(null, { status: 401 });

      if (role !== UserRole.ADMIN) {
        return new Response(null, { status: 403 });
      }

    }
  }, app => (
    app.get("/users", async () => {
      const users = await UsersHandler.getAll();

      return users;
    }),

    app.get("/users/:id", async (req) => {
      const { id } = req.params;
      const user = await UsersHandler.getById(parseInt(id));

      return user;
    }),

    app.post(
      "/users",
      async (req) => {
        const { email, name, password, role } = req.body;
        await UsersHandler.create({ email, name, password, role });
      },
      {
        body: t.Object({
          email: t.String(),
          name: t.String(),
          password: t.String(),
          role: t.Enum(UserRole),
        }),
      }
    ),

    app.delete("/users/:id", async (req) => {
      const { id } = req.params;
      await UsersHandler.deleteById(parseInt(id));
    })
  ))
)
