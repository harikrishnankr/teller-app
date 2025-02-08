import { cookies } from "next/headers";

export async function serverFetch(url: string, options: RequestInit) {
  const cookieStore = await cookies();
  const requestInit = options;
  requestInit.headers = { Cookie: cookieStore.toString() };
  // requestInit.cache = "no-store";
  return fetch(url, requestInit);
}
