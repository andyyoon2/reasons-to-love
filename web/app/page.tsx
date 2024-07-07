import { getAccessToken, getSession } from "@auth0/nextjs-auth0";

const API_HOST = process.env.REASONS_API_HOST || "";

async function fetchPartnerships() {
  const {accessToken} = await getAccessToken();
  console.log('access token...', accessToken)
  if (!accessToken) {
    return [];
  }

  // TODO: Assumes user is logged in
  try {
    const res = await fetch(`${API_HOST}/partnerships`, {
      headers: {
        contentType: 'application/json',
        authorization: `Bearer ${accessToken}`
      }
    });
    console.log('RESPONSE', res);

    if (!res.ok) {
      console.error(res);
      return [];
    }

    return res;
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
  console.log(session);

  const partnerships = fetchPartnerships();

  return (
    <main>
      <h1>Welcome!</h1>
    </main>
  )
}
