import { UserAvatarLoading, UserAvatar, getAuth0User } from "../UserAvatar";
import { Suspense } from "react";
import { Reason } from "@/app/models";
import { getSession } from "@auth0/nextjs-auth0";

export async function FeaturedReason({ reason }: { reason: Reason }) {
  // Copied from UserAvatar.tsx
  const session = await getSession();

  if (!session?.user) {
    return null;
  }

  let author;
  if (reason.authorId === session.user.sub) {
    author = session.user;
  } else {
    author = await getAuth0User(reason.authorId);
  }

  return (
    <div key={reason.id} className="mb-8 p-6 border rounded-lg flex flex-col gap-4 bg-slate-600 dark:bg-slate-300">
      <div className="flex items-center gap-4">
        <Suspense fallback={<UserAvatarLoading size='large' />}>
          <UserAvatar size='large' authorId={reason.authorId} />
        </Suspense>
        <p className="text-lg text-slate-200 dark:text-slate-800 flex-1">{author.name}</p>
        <p className="text-sm text-slate-300 dark:text-slate-700 self-start mt-2">NEW</p>
      </div>
      <p className="text-lg mt-2 text-slate-100 dark:text-slate-900">{reason.message}</p>
      <p className="text-slate-300 dark:text-slate-600">{reason.date.toLocaleString()}</p>
    </div>
  )
}
