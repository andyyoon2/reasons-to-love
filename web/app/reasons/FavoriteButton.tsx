'use client';

import { useState } from 'react';

interface FavoriteButtonProps {
  favorited: boolean;
  onClick: () => void;
}

export default function FavoriteButton(/*{ favorited, onClick }: FavoriteButtonProps*/) {
  const [favorited, setFavorited] = useState(false);
  const handleClick = () => {
    setFavorited(!favorited)
  }
  return (
    <button onClick={handleClick}>{favorited ? '💛' : '🩶'}</button>
  );
}
