import { getSession } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import { Suspense } from 'react';

async function UserInfo() {
  const session = await getSession();
  const user = session?.user;

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <p>{user.name}</p>
        <img className="w-8 aspect-square rounded-full" src={user.picture} />
        <a href="/api/auth/logout">Logout</a>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <a href="/api/auth/login">Login</a>
    </div>
  );
}

export default function Header({ className }: { className?: string; }) {
  return (
    <header className="w-full p-4 flex space-between items-center gap-4">
      <span className="grow font-semibold">Reasons to Love.</span>
      <nav className={className}>
        <Link href="/reasons/favorites">Favorites 💛</Link>
        <Link href="/reasons">Reasons 🗒️</Link>
        <Link href="/reasons/sent">Sent ✉️</Link>
      </nav>
      <Suspense>
        <UserInfo />
      </Suspense>
    </header>
  );
}
