import Footer from "@/components/Footer";
import { BentoGridSecond } from "@/components/LandingPage/BentoGrid";
import FirstSection from "@/components/LandingPage/FirstSection";
import { TabsDemo } from "@/components/LandingPage/Tabs";
import { MoveDown } from "lucide-react";

export default function Home() {
  return (
    <main className="menu-blur flex flex-col items-center justify-center">
      <div className="flex flex-col lg:gap-20 gap-10 w-full max-w-[100rem] max-[1700px]:max-w-[90%] max-[500px]:max-w-[95%] h-full">
        <FirstSection />

        <BentoGridSecond />

        <TabsDemo />
      </div>

      <div className="fixed z-20 right-10 bottom-5 max-[1800px]:hidden  animate-bounce w-12 h-12 grid place-content-center border rounded-full">
        <MoveDown size={20} className="text-[#422caf]" />
      </div>

      <Footer />
    </main>
  );
}
