'use client';

import { useState } from "react";

export default function CreatePartnershipForm() {
  const [name, setName] = useState('');

  // This isn't the most up to date Next.js Way, but this is faster to write for me atm.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch('/api/partnerships', {
      method: 'POST',
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    console.log(data);
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Partnership name" value={name} onChange={e => setName(e.target.value)} />
      <button type="submit">Create</button>
    </form>
  );
}