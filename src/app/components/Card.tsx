import { Check } from "lucide-react";
import Link from "next/link";



type CardProps = {
  title: string;
  subtitle: string;
  price: string;
  addons: string;
  planArr: string[];
  addtitionalTitle?: string;
  additionalArr?: string[];
}

export default function Card(props: CardProps) {
  return (
    <div className="bg-gray-100 p-6 rounded-xl">
      <div className="flex flex-col gap-1 text-cyan-900 mb-10">
        <h2 className="font-bold  text-xl">{props.title}</h2>
        <p className="text-sm">{props.subtitle}</p>
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-cyan-900 font-bold text-3xl">{props.price}</span>
        <Link
          href={"/dashboard"}
          className="btn bg-blue-500 text-white !rounded-md justify-center
          duration-300 hover:bg-blue-600"
        >
          Get started
        </Link>
      </div>
      <div className="flex flex-col gap-2 mt-6">
        <p className="text-sm text-cyan-900">{props.addons}:</p>
        <span className="text-cyan-950">Scheduling</span>
        <ul>
          {props.planArr.map((text, index) => (
            <li key={index} className="flex items-center gap-2">
              <span className="text-cyan-800">
                <Check size={12} />
              </span>
              <span
                className="text-cyan-900/70 text-sm border-b
                  border-gray-500 border-dotted"
              >
                {text}
              </span>
            </li>
          ))}
        </ul>
        {props.addtitionalTitle && props.additionalArr && (
          <div>
            <span className="text-cyan-950">{props.addtitionalTitle}</span>
            <ul>
          {props.additionalArr.map((text, index) => (
            <li key={index} className="flex items-center gap-2">
              <span className="text-cyan-800">
                <Check size={12} />
              </span>
              <span
                className="text-cyan-900/70 text-sm border-b
                  border-gray-500 border-dotted"
              >
                {text}
              </span>
            </li>
          ))}
        </ul>
          </div>
        )}
      </div>
    </div>
  );
}
