"use client";
import clsx from "clsx";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export default function MeetingUri({ uri }: { uri: string }) {
  const [copied, setCoppied] = useState(false);
  async function handleCopy() {
    await navigator.clipboard.writeText(uri);
    setCoppied(true);
    setTimeout(() => setCoppied(false), 1000);
  }
  return (
    <div className="flex">
      <input className="text-gray-500" type="text" value={uri} readOnly />
      <button
        type="button"
        onClick={handleCopy}
        className={clsx(
          "px-2 text-sm rounded-lg border min-w-24 duration-500",
          !copied ? "bg-white" : "bg-green-300"
        )}
      >
        {!copied ? (
          <span className="flex items-center justify-center gap-2">
            <Copy size={18} /> Copy
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <Check /> Copied!
          </span>
        )}
      </button>
    </div>
  );
}
