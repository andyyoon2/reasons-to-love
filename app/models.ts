// TS models for Prisma schema

export interface Reason {
  id: number;
  date: Date;
  message: string;
  partnershipId: number;
  authorId: string;
  // usersWhoFavorited: number[];
}
