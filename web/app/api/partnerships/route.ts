import { prisma } from '@/app/lib/prisma';
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';

/** Gets the most recent partnership for the currently logged in user */
export const GET = withApiAuthRequired(async () => {
  const session = await getSession();
  const userId = session?.user.sub;
  const partnerships = await prisma.partnership.findFirst({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
    },
    orderBy: {
      id: 'desc',
    },
  });
  return Response.json(partnerships);
});
