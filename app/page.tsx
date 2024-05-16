import FirstSection from "@/components/LandingPage/FirstSection";
import { MoveDown } from "lucide-react";

export default function Home() {
  return (
    <main className="menu-blur h-[100vh] flex items-center justify-center rounded-3xl">
      <div className="w-full max-w-[100rem] max-[1700px]:max-w-[90%] max-[500px]:max-w-[95%] h-full">
        <FirstSection />
      </div>

      <div className="fixed z-20 right-10 bottom-5 max-[1800px]:hidden  animate-bounce w-12 h-12 grid place-content-center border rounded-full">
        <MoveDown size={20} className="text-[#422caf]" />
      </div>
    </main>
  );
}
