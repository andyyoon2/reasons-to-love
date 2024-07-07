import Link from 'next/link';

export default function Header({ className }: { className?: string; }) {
  return (
    <header>
      <span>Reasons to Love.</span>
        <nav className={className}>
          <Link href="/reasons/favorites">Favorites 💛</Link>
          <Link href="/reasons">Reasons 🗒️</Link>
          <Link href="/reasons/sent">Sent ✉️</Link>
          <a href="/api/auth/login">Login</a>
          <a href="/api/auth/logout">Logout</a>
        </nav>
    </header>
  );
}
