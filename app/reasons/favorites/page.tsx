import ReasonView, { Reason } from '../ReasonView';

const mockReason: Reason = {
  id: '1',
  date: '2023-12-25',
  partnership: 1,
  author: 'Andy Yoon',
  message: '재민, I love you because you are so funny and you love chocolate.',
  favoritedBy: [],
}

async function fetchReasons(): Promise<Reason[]> {
  return [
    {...mockReason, id:'1'},
    {...mockReason, id:'2'},
    {...mockReason, id:'3'},
    {...mockReason, id:'4'},
  ];
}

export default async function Page() {
  const reasons = await fetchReasons();

  return (
    <main>
      <h1 className="text-2xl font-semibold mb-4">Your favorites</h1>
      {reasons.length === 0 && (
        <p>No favorites yet.</p>
      )}
      {reasons.map(reason => (
        <div key={reason.id} className="mb-4">
          <ReasonView reason={reason} />
        </div>
      ))}
    </main>
  );
}
