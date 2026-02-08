export function toCurl(input: string | URL | globalThis.Request, init?: RequestInit) {
  const url = typeof input === "string" ? input : input.toString();
  const method = init?.method ?? "GET";
  const headers = new Headers(init?.headers);

  let cmd = `curl -X ${method} '${url}'`;
  for (const [key, value] of headers.entries()) {
    cmd += ` \\\n  -H '${key}: ${value}'`;
  }

  if (init?.body) {
    cmd += ` \\\n  --data '${init.body.toString()}'`;
  }

  return cmd;
}
