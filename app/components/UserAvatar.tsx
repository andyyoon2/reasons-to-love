import { cache } from "react";
import { getSession } from "@auth0/nextjs-auth0";
import { ManagementClient } from 'auth0';

const getAuthorImage = cache(async (id: string) => {
  const client = new ManagementClient({
    domain: process.env.AUTH0_DOMAIN ?? '',
    clientId: process.env.AUTH0_CLIENT_ID ?? '',
    clientSecret: process.env.AUTH0_CLIENT_SECRET ?? '',
  });

  const res = await client.users.get({ id: id });
  console.log(res);
  return res.data.picture;
})

export function UserAvatarLoading() {
  return <div className="bg-slate-400 h-5 aspect-square rounded-full" />
}

export async function UserAvatar({ authorId }: { authorId: string }) {
  const session = await getSession();

  if (!session?.user) {
    return null;
  }

  let src = '';
  if (authorId === session.user.sub) {
    src = session.user.picture;
  } else {
    src = await getAuthorImage(authorId);
  }

  return (
    <div className="bg-slate-400 h-5 aspect-square rounded-full">
      <img src={src} className="h-full w-full rounded-full" />
    </div>
  )
}
