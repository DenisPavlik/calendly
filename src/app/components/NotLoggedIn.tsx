"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PulseLoader } from "react-spinners";

export default function NotLoggedIn() {
  const router = useRouter();

  useEffect(()=> {
  const timeout = setTimeout(()=>{
      router.push('/api/auth');
      router.refresh();
    }, 3000);

  return () => clearTimeout(timeout);
  })
  
    return (
      <div className="text-center flex flex-col items-center">
        <h1 className="font-semibold text-xl mt-20">You are not logged in</h1>
        <div className="text-gray-400 flex items-center gap-2">
          <span>Redirecting to login page</span>{" "}
          <PulseLoader size={6} color="gray" speedMultiplier={0.5} />
        </div>
      </div>
    );
}