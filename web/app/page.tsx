import { getAccessToken, getSession } from "@auth0/nextjs-auth0";

const API_HOST = process.env.REASONS_API_HOST || "";

async function fetchPartnership() {
  const {accessToken} = await getAccessToken();
  if (!accessToken) {
    return [];
  }

  try {
    const res = await fetch(`${API_HOST}/reasons/`, {
      headers: {
        contentType: 'application/json',
        authorization: `Bearer ${accessToken}`
      }
    });

    if (!res.ok) {
      console.error(res);
      return [];
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default async function Home() {
  const session = await getSession();
  if (!session?.user) {
    return (
      <main>Please login.</main>
    );
  }

  const partnership = await fetchPartnership();

  return (
    <main>
      <h1>Welcome!</h1>
      <p className="font-mono">{JSON.stringify(partnership)}</p>
    </main>
  )
}
