import Link from 'next/link';

export default function MobileNav({ className }: { className?: string; }) {
  return (
    <nav className={className}>
      <Link href="/reasons/favorites">Favorites 💛</Link>
      <Link href="/reasons">Reasons 🗒️</Link>
      <Link href="/reasons/sent">Sent ✉️</Link>
    </nav>
  );
}
