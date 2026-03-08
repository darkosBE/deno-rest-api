import { FreshContext } from "$fresh/server.ts";

export const handler = async (req: Request, ctx: FreshContext): Promise<Response> => {
  const url = new URL(req.url);
  const target = `http://darknode.spxo.ru:20259${url.pathname}${url.search}`;

  const headers = new Headers(req.headers);
  headers.set("Host", "darknode.spxo.ru");

  try {
    const response = await fetch(target, {
      method: req.method,
      headers,
      body: req.body,
      redirect: "manual",
    });

    return new Response(response.body, {
      status: response.status,
      headers: response.headers,
    });
  } catch (e: unknown) {
    const error = e as Error;
    return new Response(`Proxy error: ${error.message}`, { status: 500 });
  }
};
