import { getAccessToken } from "@auth0/nextjs-auth0";

const API_HOST = process.env.REASONS_API_HOST || "";

export async function fetchServerSide<T>(path: string, defaultValue: T): Promise<T> {
  const {accessToken} = await getAccessToken();
  if (!accessToken) {
    return defaultValue;
  }

  try {
    const res = await fetch(`${API_HOST}${path}`, {
      headers: {
        contentType: 'application/json',
        authorization: `Bearer ${accessToken}`
      }
    });

    if (!res.ok) {
      console.error(res);
      return defaultValue;
    }

    const data = await res.json();
    // TODO: This is kinda hacky, we can make it better.
    // data.results exists on a List endpoint, but not Retrieve endpoint.
    return data.results ?? data;
  } catch (err) {
    console.error(err);
    return defaultValue;
  }
}
