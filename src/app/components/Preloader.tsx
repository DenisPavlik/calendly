import { LoaderCircle } from "lucide-react";
import { ClockLoader } from "react-spinners";

export default function Preloader() {
  return (
    <div className="flex items-center justify-center mt-10">
      {/* <LoaderCircle className="h-10 w-10 text-blue-600 animate-spin" /> */}
      <ClockLoader color="#3B82F6" speedMultiplier={2} />
    </div>
  )
}