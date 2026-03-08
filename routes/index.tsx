import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

serve(async (req) => {
  const url = new URL(req.url);
  const target = `http://darknode.spxo.ru:20259${url.pathname}${url.search}`;

  const response = await fetch(target, {
    method: req.method,
    headers: req.headers,
    body: req.body,
  });

  return new Response(response.body, {
    status: response.status,
    headers: response.headers,
  });
}, { port: 8000 });

console.log("Proxy running on port 8000");
