import Companies from "@/app/components/Companies";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FeaturesPage() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center mt-4">
        <h1 className="text-6xl font-bold text-cyan-900 text-center">
          Book meetings that work for you
        </h1>
        <p className="text-gray-500 font-light text-center my-8">
          Automate scheduling to solve any meeting scenario, improve meeting
          prep and follow-up, route calls to experts, connect all the tools you
          need, and stay secure.
        </p>
        <div className="flex items-center gap-2">
          <a
            href={""}
            className="btn border border-blue-500 bg-blue-500 text-white !rounded-lg"
          >
            Sign up for free
          </a>
          <Link href={""} className="btn border border-gray-700 !rounded-lg">
            About us
          </Link>
        </div>
        <Companies />
      </div>
      <div>
        <h1>For everyone who schedules meetings</h1>
        <p>
          Meet faster to close deals, support customers, and hire top talent –
          bring the right people together, automate tasks like sending
          reminders, and drive business growth with integrations, analytics, and
          security features.
        </p>
        <Link href={"/pricing"}>
          View plan options <ArrowRight />
        </Link>
      </div>
    </div>
  );
}
