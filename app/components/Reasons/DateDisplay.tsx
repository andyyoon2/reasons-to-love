'use client';

export function DateDisplay({ date, className }: { date: Date, className?: string }) {
  return <p className={className}>{date.toLocaleString()}</p>;
}
