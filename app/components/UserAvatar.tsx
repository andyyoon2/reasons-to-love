import { cache } from "react";
import { getSession } from "@auth0/nextjs-auth0";
import { ManagementClient } from 'auth0';

export const getAuth0User = cache(async (id: string) => {
  const client = new ManagementClient({
    domain: process.env.AUTH0_DOMAIN ?? '',
    clientId: process.env.AUTH0_CLIENT_ID ?? '',
    clientSecret: process.env.AUTH0_CLIENT_SECRET ?? '',
  });

  const res = await client.users.get({ id: id });
  return res.data;
})

export function UserAvatarLoading({ size = 'small' }: { size?: 'small' | 'large' }) {
  return <div className={`bg-slate-400 ${size === 'large' ? 'h-10' : 'h-5'} aspect-square rounded-full`} />
}

export async function UserAvatar({ authorId, size = 'small' }: { authorId: string, size?: 'small' | 'large' }) {
  const session = await getSession();

  if (!session?.user) {
    return null;
  }

  let author;
  if (authorId === session.user.sub) {
    author = session.user;
  } else {
    author = await getAuth0User(authorId);
  }

  return (
    <div className={`bg-slate-400 ${size === 'large' ? 'h-10' : 'h-5'} aspect-square rounded-full`}>
      <img src={author.picture} className="h-full w-full rounded-full" />
    </div>
  )
}
