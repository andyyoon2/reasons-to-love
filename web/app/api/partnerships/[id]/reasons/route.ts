import { prisma } from '@/app/lib/prisma';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest } from 'next/server';

/** Gets all reasons within the given partnership for the currently logged in user */
export const GET = async (
  request: NextRequest,
  {params}: {params: { id: string }}
) => {
  const session = await getSession();
  const userId = session?.user.sub;
  const partnershipId = parseInt(params.id, 10);
  if (isNaN(partnershipId)) {
    return Response.json({ error: 'Invalid partnership ID' }, { status: 400 });
  }

  const reasons = await prisma.message.findMany({
    where: {
      authorId: userId,
      partnershipId: partnershipId,
    },
  });
  return Response.json(reasons);
};
