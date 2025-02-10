import { Suspense } from 'react';
import { getSession } from "@auth0/nextjs-auth0";
import { AddReason } from "./components/AddReason";
import { prisma } from "./lib/prisma";
import CreatePartnershipForm from "./components/CreatePartnershipForm";
import { UserAvatar, UserAvatarLoading } from './components/UserAvatar';
import { ReasonsList } from './components/Reasons/ReasonsList';
import { ReasonListItem } from './components/Reasons/ReasonListItem';
import { FeaturedReason } from './components/Reasons/FeaturedReason';

// TODO: Use local timezone here
function formatDate(d: Date): string {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  } as const;
  return new Intl.DateTimeFormat(undefined, options).format(d);
}

async function getPartnership(userId: string) {
  return prisma.partnership.findFirst({
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
}

async function getReasons(partnershipId: number) {
  return prisma.message.findMany({
    where: {
      partnershipId,
    },
    orderBy: {
      date: 'desc',
    },
    take: 10, // TODO: Pagination
  });
}

export default async function Home() {
  const session = await getSession();
  if (!session?.user) {
    return (
      <main className="h-screen">Please login.</main>
    );
  }

  // TODO: Handle if user doesn't have partnership yet
  // TODO: Pagination

  const partnership = await getPartnership(session.user.sub);

  if (!partnership) {
    return (
      <main>
        <div className="max-w-prose">
          <h1 className="text-4xl font-light tracking-tight my-[1em]">Create a partnership</h1>

          <CreatePartnershipForm />
        </div>
      </main>
    );
  }

  const reasons = await getReasons(partnership.id);

  return (
    <main>
      <div className="max-w-prose">
        <h1 className="text-4xl font-light tracking-tight my-[1em]">Reasons to Love in Sweet Whale</h1>

        <AddReason className="mb-8" partnership={partnership} />

        {reasons.length > 0 && (
          <ReasonsList
            featuredReason={<FeaturedReason reason={reasons[0]} />}
            featuredReasonDate={reasons[0].date}
            reasonsList={reasons.map(reason => <ReasonListItem key={reason.id} reason={reason} />)}
          />
        )}
      </div>
    </main>
  );
}
