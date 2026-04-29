import Footer from "@/app/(public)/_components/Footer";
import Navbar from "@/app/(public)/_components/Navbar";

export default function ComingSoon() {
  return (
    <>
      <Navbar />
      <div
        className={`bg-[#0B0B0C] h-screen text-white flex flex-col items-stretch justify-between min-w-100vw`}
      >
        <h1>hello</h1>
        <h1 className="text-5xl font-semibold italic bg-green-400 text-center">
          Coming SOON...
        </h1>
        <Footer />
      </div>
    </>
  );
}
