import { getSession } from "@auth0/nextjs-auth0";
import { Reason } from "./models";
import { fetchServerSide } from "./utils";
import { AddReason } from "./components/AddReason";
import { prisma } from "./lib/prisma";
import CreatePartnershipForm from "./components/CreatePartnershipForm";

function formatDate(d: string): string {
  // Assume d is ISO-8601 format
  const date = new Date(d);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  } as const;
  return new Intl.DateTimeFormat(undefined, options).format(date);
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
  console.log('partnership', partnership);

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

        {reasons.map(reason => (
          <div key={reason.id} className="mb-8">
            <div className="flex items-center gap-2">
              <div className="bg-slate-400 h-5 aspect-square rounded-full"></div>
              <p className="text-sm text-slate-600">{formatDate(reason.date)}</p>
            </div>
            <p className="mt-2">{reason.message}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
