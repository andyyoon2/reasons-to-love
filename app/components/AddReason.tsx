'use client';

import { useState } from "react";
import clsx from "clsx";
import { addReason } from "../actions/addReason";

const twButton = "border border-slate-400 rounded bg-slate-200 dark:bg-slate-800 px-4 py-2";

interface AddReasonProps {
  className?: string;
  partnership: any;
}

export function AddReason({ className, partnership }: AddReasonProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = addReason.bind(null, partnership);

  return (
    <>
      <button className={clsx(twButton, className)} onClick={handleOpen}>Write new message...</button>

      {/* Modal background */}
      <div
        className={clsx(
          open ? "opacity-100 z-10" : "opacity-0 -z-10",
          "transition fixed top-0 left-0 w-full h-full backdrop-blur")}
        onClick={handleClose}
      />

      {/* Modal */}
      <div className={clsx(
        open ? "opacity-100 z-10" : "opacity-0 -z-10",
        "transition fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-80 min-h-80",
        "bg-white p-8 border border-slate-200 rounded shadow-lg"
      )}>
        <button onClick={handleClose} className="absolute top-3 right-3">x</button>

        <form action={handleSubmit} onSubmit={handleClose}>
          <div>
            <p className="mb-8">Write to your partner!</p>
            <textarea
              name="message"
              className="border border-slate-400 rounded w-full p-4"
              autoFocus
              placeholder="I love you because..."
            />
          </div>

          <div className="mt-4 text-right">
            <button className={clsx(twButton, "py-1 min-w-28")} type="submit">Send</button>
          </div>
        </form>
      </div>
    </>
  )
}
