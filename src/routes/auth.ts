import { Elysia, t } from "elysia";

import { authenticate } from "../handler/auth";

export const authRoutes = (app: Elysia) =>
  app.post("/auth", async (req) => {
    const { email, password } = req.body;

    return authenticate({ email, password });
  }, {
    body: t.Object({
      email: t.String(),
      password: t.String(),
    })
  })
