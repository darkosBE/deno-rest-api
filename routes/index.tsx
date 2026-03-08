Deno.serve({ port: 8000 }, async (req: Request) => {
  const url = new URL(req.url);
  const target = `http://darknode.spxo.ru:20259${url.pathname}${url.search}`;

  try {
    const response = await fetch(target, {
      method: req.method,
      headers: req.headers,
      body: req.body,
    });

    return new Response(response.body, {
      status: response.status,
      headers: response.headers,
    });
  } catch (e: unknown) {
    const error = e as Error;
    return new Response(`Proxy error: ${error.message}`, { status: 500 });
  }
});

console.log("Proxy running on port 8000");
