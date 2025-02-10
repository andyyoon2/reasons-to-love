import { prisma } from '@/app/lib/prisma';
import { getSession } from '@auth0/nextjs-auth0';
import { NextRequest } from 'next/server';

/** Get the most recent partnership for the currently logged in user */
export const GET = async () => {
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
};

/** Create a new partnership for the currently logged in user */
export const POST = async (request: NextRequest) => {
  const session = await getSession();
  const userId = session?.user.sub;
  
  if (!userId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  
  if (!body.name) {
    return Response.json({ error: 'Name is required' }, { status: 400 });
  }

  const partnership = await prisma.partnership.create({
    data: {
      name: body.name,
      users: {
        create: {
          id: userId,
          name: session.user.name || '',
          nickname: session.user.nickname || '',
        }
      }
    },
    include: {
      users: true
    }
  });

  return Response.json(partnership);
};
