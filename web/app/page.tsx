import { getSession } from "@auth0/nextjs-auth0";
import { Reason } from "./models";
import { fetchServerSide } from "./utils";
import { AddReason } from "./components/AddReason";
import { prisma } from "./lib/prisma";

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

export default async function Home() {
  const session = await getSession();
  if (!session?.user) {
    return (
      <main className="h-screen">Please login.</main>
    );
  }

  // TODO: Handle if user doesn't have partnership yet
  // TODO: Pagination

  const reasons = await fetchServerSide<Reason[]>('/reasons/', []);
  // const partnership = await fetchServerSide<any>('/partnerships/', {});
  const partnership = await getPartnership(session.user.sub);
  console.log(partnership);

  if (!partnership) {
    return (
      <main>
        <div className="max-w-prose">
          <h1 className="text-4xl font-light tracking-tight my-[1em]">Create a partnership</h1>

          {/* A simple form to create a partnership */}
          <form action="/api/partnerships" method="post">
            <input type="text" name="name" placeholder="Partnership name" />
            <button type="submit">Create</button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="max-w-prose">
        <h1 className="text-4xl font-light tracking-tight my-[1em]">Reasons to Love in Sweet Whale</h1>

        <AddReason className="mb-8" username={session.user.sub} partnership={partnership} />

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
