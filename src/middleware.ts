import { defineMiddleware } from "astro/middleware";
import { validateToken } from "@domain/Admin";

const PROTECTED_PATHS = ["/guests"];
const isProtectedPath = (path: string) =>
  PROTECTED_PATHS.some((p) => path.startsWith(p));

export const onRequest = defineMiddleware((context, next) => {
  if (
    isProtectedPath(context.url.pathname) &&
    !validateToken(context.cookies.get("Authorization")?.value)
  ) {
    return context.redirect("/login");
  }

  // devuelve una respuesta o el resultado de llamar a `next()`.
  return next();
});
