"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/next";

// Rotas que não devem gerar eventos de pageview (área logada).
const ROTAS_IGNORADAS = ["/admin"];

export function Analytics() {
  return (
    <VercelAnalytics
      beforeSend={(event) => {
        const { pathname } = new URL(event.url);
        if (ROTAS_IGNORADAS.some((rota) => pathname.startsWith(rota))) {
          return null;
        }
        return event;
      }}
    />
  );
}
