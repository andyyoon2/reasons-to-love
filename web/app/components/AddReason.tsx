'use client';

import { ChangeEvent, useState } from "react";
import clsx from "clsx";

const twButton = "border border-slate-400 rounded bg-slate-200 px-4 py-2";

export function AddReason({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  }

  const submit = () => {

  }

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

        <div>
          <p className="mb-8">Write to your partner!</p>
          <textarea
            className="border border-slate-400 rounded w-full p-4"
            autoFocus
            value={message}
            onChange={handleTextareaChange}
          />
        </div>

        <div className="mt-4 text-right">
          <button className={clsx(twButton, "py-1 min-w-28")} onClick={submit}>Send</button>
        </div>
      </div>
    </>
  )
}
