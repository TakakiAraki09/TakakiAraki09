import { ENV } from "../env.ts";
import { toCurl } from "./toCurl.ts";

export async function baseFetch(
  input: string | URL | globalThis.Request,
  init?: RequestInit
) {
  try {
    const res = await fetch(input, init);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }

    return res;
  } catch (err) {
    if (ENV.TARGET_ENV === 'local') console.error(toCurl(input, init));
    throw err;
  }
}
