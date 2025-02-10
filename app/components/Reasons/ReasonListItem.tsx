import { UserAvatarLoading, UserAvatar } from "../UserAvatar";
import { Suspense } from "react";
import { Reason } from "@/app/models";

export function ReasonListItem({ reason }: { reason: Reason }) {
  return (
    <div key={reason.id} className="mb-8">
      <div className="flex items-center gap-2">
        <Suspense fallback={<UserAvatarLoading />}>
          <UserAvatar authorId={reason.authorId} />
        </Suspense>
        <p className="text-sm text-slate-600 dark:text-slate-300">{reason.date.toLocaleString()}</p>
      </div>
      <p className="mt-2">{reason.message}</p>
    </div>
  )
}
