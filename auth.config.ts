import type { NextAuthConfig } from 'next-auth';

// Este archivo es compatible con el Edge Runtime (Middleware)
export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirige a login si no está autenticado
            } else if (isLoggedIn) {
                // CORRECCIÓN: Asegura que nextUrl sea una URL base válida
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
    },
    providers: [], 
} satisfies NextAuthConfig;