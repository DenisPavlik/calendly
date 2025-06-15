import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="flex flex-col">
      <h1 className="my-8 text-5xl font-bold text-cyan-900 text-center">
        Pick the perfect plan for you
      </h1>
      <div className="flex gap-4">
        <div className="bg-gray-100 p-6 rounded-xl">
          <div className="flex flex-col gap-1 text-cyan-900 mb-10">
            <h2 className="font-bold  text-xl">Free</h2>
            <p className="text-sm">For personal use</p>
          </div>
          <div className="flex flex-col">
            <span className="text-cyan-900 font-bold text-2xl">
              Always free
            </span>
            <div className="text-center w-full">
              <Link href={""} className="btn bg-blue-500 text-white !rounded-md">
              Get started
            </Link>
            </div>
          </div>
          <div>
            <p>Free features:</p>
            <span>Scheduling</span>
            <ul>
              <li className="">1 event type</li>
              <li>Connect 1 calendar</li>
              <li>Customize availability</li>
              <li>Add video conferencing</li>
              <li>Customize your booking page</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
