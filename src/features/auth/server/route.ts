import { Hono } from "hono";
import { loginSchema } from "../schema";
import { zValidator } from '@hono/zod-validator'
const app = new Hono()
    .post("/login", zValidator("json", loginSchema), (c) => {
        const { email, password } = c.req.valid("json")
        return c.json({
            email,
            password
        });
    });

export default app;