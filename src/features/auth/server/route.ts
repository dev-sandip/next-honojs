import { Hono } from "hono";
import { loginSchema, registerSchema } from "../schemas";
import { zValidator } from '@hono/zod-validator'
import { createAdminClient } from "@/lib/appwrite";
import { ID } from "node-appwrite";
import { setCookie } from "hono/cookie"
import { AUTH_COOKIE } from "../constants";

const app = new Hono()
    .post("/login", zValidator("json", loginSchema), async (c) => {
        try {
            const { email, password } = c.req.valid("json")
            const { account } = await createAdminClient();
            const session = await account.createSession(email, password);
            setCookie(c, AUTH_COOKIE, session.secret, {
                path: "/",
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 30
            })
            return c.json({
                success: true,
                user: session.userId,
            });
        } catch (error) {
            console.error('Login error:', error);
            return c.json({ success: false, message: 'Login failed' }, 401);
        }
    })
    .post("/register", zValidator("json", registerSchema), async (c) => {
        try {
            const { name, email, password } = c.req.valid("json")
            const { account } = await createAdminClient();
            const user = await account.create(
                ID.unique(),
                email,
                password,
                name
            );
            console.log(user)
            const session = await account.createSession(email, password);
            setCookie(c, AUTH_COOKIE, session.secret, {
                path: "/",
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 30
            })
            return c.json({
                success: true,
                user,
            });
        } catch (e) {
            console.error('Register error:', e);
            return c.json({ success: false, message: 'Register failed' }, 401);
        }
    });

export default app;