// middleware.ts (в корне проекта, рядом с app/)
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequestWithAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    console.log("✅ Middleware running:");
    console.log("→ Path:", pathname);
    console.log("→ Token exists:", !!token);
    console.log("→ Token data:", token);

    const isAuth = !!token;

    // Редирект аутентифицированных пользователей с публичных страниц
    if (isAuth && ["/login", "/register"].includes(pathname)) {
      console.log("🔁 Redirect: already authenticated, blocking guest page");
      return NextResponse.redirect(new URL("/profile", req.url));
    }

    // Список защищенных маршрутов
    const protectedRoutes = ["/profile", "/cart"];
    const isProtected = protectedRoutes.some((route) =>
      pathname === route || pathname.startsWith(`${route}/`)
    );

    // Редирект неаутентифицированных пользователей с защищенных страниц
    if (!isAuth && isProtected) {
      console.log("🔁 Redirect: not authenticated, blocking protected page");
      const loginUrl = new URL("/login", req.url);
      // Сохраняем путь для редиректа после входа
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    console.log("✅ Access granted");
    return NextResponse.next();
  },
  {
    callbacks: {
      // Этот колбэк определяет, должен ли middleware вообще запускаться
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        // Разрешаем доступ к публичным маршрутам без токена
        const publicRoutes = ["/", "/about", "/contact"];
        if (publicRoutes.includes(pathname)) {
          return true;
        }

        // Для защищенных маршрутов требуется токен
        const protectedRoutes = ["/profile", "/cart"];
        const isProtected = protectedRoutes.some((route) =>
          pathname === route || pathname.startsWith(`${route}/`)
        );

        if (isProtected) {
          return !!token;
        }

        // Для страниц входа/регистрации всегда разрешаем (логику обрабатываем в middleware)
        return true;
      },
    },
  }
);

// Важно: матчер должен включать все маршруты, которые вы хотите обрабатывать
export const config = {
  matcher: [
    // Защищенные маршруты
    "/profile/:path*",
    "/cart/:path*",
    // Публичные маршруты для аутентифицированных (для редиректа)
    "/login",
    "/register",
    // Можете добавить другие маршруты по необходимости
    // "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};