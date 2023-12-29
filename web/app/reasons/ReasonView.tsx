import FavoriteButton from './FavoriteButton';

export interface Reason {
  id: string;
  date: string; // or Date;
  partnership: number;
  author: string;
  message: string;
  favoritedBy: string[];
}

export default function ReasonView({ reason }: { reason: Reason }) {
  return (
    <div>
      <div className="flex justify-between content-center">
        {/* TODO: How are we getting the numbers? */}
        <span>#22</span>
        <span>{reason.date}</span>
        <FavoriteButton />
      </div>
      <p>{reason.message}</p>
    </div>
  );
}
