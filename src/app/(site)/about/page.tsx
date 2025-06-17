import Companies from "@/app/components/Companies";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col mt-10">
      <div className="flex flex-col items-center text-center gap-8">
        <span className="text-sm text-blue-600 bg-blue-100 py-1 px-2 rounded-full">
          About Calendly
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-cyan-900 text-center">
          Simplifying scheduling for 20+ million
        </h1>
        <p className="font-thin text-gray-600">
          Calendly&apos;s intuitive, powerful scheduling automation platform
          helps you close deals, hire top talent, build strong relationships,
          and grow your business faster.
        </p>
        <Link href={"/dashboard"} className="btn bg-blue-500 text-white !rounded-md">
          Sing up for free
        </Link>

        <p className="font-thin mt-10">The trusted scheduling solution for everyone, from small businesses to Fortune 100 companies</p>
        <Companies left="left-0" top="top-[500px] md:top-[550px]" />
      </div>
    </div>
  );
}
