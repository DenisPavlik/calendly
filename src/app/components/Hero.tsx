"use client";

import clsx from "clsx";
import { Play } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [showLine, setShowLine] = useState(false);

  useEffect(() => {
    setShowLine(true);
  }, []);

  return (
    <section className="text-center mt-24">
      <h1 className="text-5xl font-bold mb-6 leading-tight">
        Scheduling{" "}
        <span
          className={clsx(
            "text-blue-600 cool-underline",
            showLine ? "show-underline" : ""
          )
          }
        >
          made simple
        </span>
        <br />
        for people like you
      </h1>
      <p className="text-gray-600">
        Most scheduling apps are simple but ours is even more simple. <br />
        On top of this, it&apos;s open source and you can see the code.
      </p>
      <div className="mt-4 flex gap-4 justify-center *:cursor-pointer">
        <Link href={"/dashboard"} className="bg-black text-white py-2 px-4 rounded-full">
          Get started for free
        </Link>
        <Link
          href={"https://www.youtube.com/watch?v=UZ4T7pLaOIM&ab_channel=Simpletivity"}
          target="_blank"
          className="border-2 border-gray-700 py-2 px-4 rounded-full inline-flex gap-1 items-center text-gray-800"
        >
          <Play size={16} />
          Watch video
        </Link>
      </div>
    </section>
  );
}
