import Companies from "../components/Companies";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <>
      <Hero />

      <div className="text-center mt-32 left">
        <p className="text-gray-600">Trusted by those companies:</p>
        <Companies left="left-0" top="-bottom-42" />
      </div>
    </>
  );
}
