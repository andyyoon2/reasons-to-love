'use client';

import { useState, useEffect } from "react";

const STORAGE_KEY = 'reasons:dateLastSeen';

// Displays the list of reasons. Highlights the most recent reason if the user
// hasn't seen it yet. We use client component to use localStorage.
export function ReasonsList({ featuredReason, featuredReasonDate, reasonsList }: { featuredReason: React.ReactNode, featuredReasonDate: Date, reasonsList: React.ReactNode[] }) {
  const [dateLastSeen, setDateLastSeen] = useState<Date | null>(null);

  // Get & set date last seen from localStorage
  useEffect(() => {
    try {
      const dateLastSeen = localStorage.getItem(STORAGE_KEY);
      if (dateLastSeen) {
        setDateLastSeen(new Date(dateLastSeen));
      }
  
      localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    } catch (error) {
      console.error('Error getting date last seen from localStorage', error);
    }
  }, []);

  // Show featured reason if user hasn't seen it yet (15 min overlap period)
  const showFeaturedReason = dateLastSeen && featuredReasonDate >= new Date(dateLastSeen.getTime() + 15 * 60 * 1000);
  const reasonsToDisplay = showFeaturedReason ? reasonsList.slice(1) : reasonsList;

  return (
    <div>
      {showFeaturedReason && featuredReason}
      {reasonsToDisplay}
    </div>
  )
}
