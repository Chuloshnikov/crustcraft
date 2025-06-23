// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // Вариант без дополнительной кастомной авторизации:
  // просто защищает маршруты, указанные в config.matcher
  null,
  {
    pages: {
      signIn: "/login",
      // если хотите, можно указать кастомную страницу ошибок
    },
    secret: process.env.NEXTAUTH_SECRET,
  }
);

export const config = {
  matcher: [
    // страница входа и регистрации
    "/login",
    "/register",
    // защищённые маршруты – доступ только для авторизованных
    "/profile/:path*",
    "/cart/:path*",
    "/categories/:path*",
    "/menu/:path*",
    "/menu-items/:path*",
    "/orders/:path*",
  ],
};