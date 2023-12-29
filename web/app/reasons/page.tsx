interface Reason {
  id: string;
  date: Date;
  partnership: number;
  author: string;
  message: string;
  favoritedBy: string[];
}

async function fetchReasons(): Promise<Reason[]> {
  return [];
}

export default async function Page() {
  const reasons = await fetchReasons();

  return (
    <main>
      {/* TODO: Get the author name from the partnership */}
      <h1>Reasons why JaeMin loves you</h1>
      {reasons.length === 0 && (
        <p>No reasons yet.</p>
      )}
      {reasons.map(reason => (
        <div key={reason.id}>
          {JSON.stringify(reason)}
        </div>
      ))}
    </main>
  );
}
