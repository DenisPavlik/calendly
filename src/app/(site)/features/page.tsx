import Companies from "@/app/components/Companies";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FeaturesPage() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center mt-4">
        <h1 className="text-4xl md:text-6xl font-bold text-cyan-900 text-center">
          Book meetings that work for you
        </h1>
        <p className="text-gray-500 font-light text-center my-8">
          Automate scheduling to solve any meeting scenario, improve meeting
          prep and follow-up, route calls to experts, connect all the tools you
          need, and stay secure.
        </p>
        <div className="flex items-center gap-2">
          <Link
            href={"/dashboard"}
            className="btn border border-blue-500 bg-blue-500 text-white !rounded-lg duration-300 hover:bg-blue-700/90"
          >
            Sign up for free
          </Link>
          <Link
            href={"/about"}
            className="btn border border-gray-700 !rounded-lg"
          >
            About us
          </Link>
        </div>
        <Companies left="left-0" top="top-[400px] sm:top-[350px] md:top-[400px]" />
      </div>
      <div className="mt-32">
        <h1 className="text-4xl md:text-6xl text-center font-bold text-cyan-900">
          For everyone who schedules meetings
        </h1>
        <p className="text-gray-500 font-light text-center my-8">
          Meet faster to close deals, support customers, and hire top talent –
          bring the right people together, automate tasks like sending
          reminders, and drive business growth with integrations, analytics, and
          security features.
        </p>
        <div className="flex items-center justify-center pb-6">
          <Link
            href={"/pricing"}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-800 duration-300 group"
          >
            View plan options{" "}
            <ArrowRight
              className="transform transition-transform duration-300 group-hover:translate-x-2"
              size={20}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
