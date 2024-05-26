import { getUserById } from "@/app/data/user";
import Delete from "@/components/settings/Delete";
import MainContent from "@/components/settings/MainContent";
import SideBar from "@/components/settings/SideBar";
import getSession from "@/lib/getSession";
import { Loader2 } from "lucide-react";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Code Caviar | Settings",
  description: "Coding Platform",
};

async function page() {  
  const session = await getSession();
  let user = null;

  if (!session)
    return (
      <Loader2 size={30} className="mx-auto my-10 animate-spin mt-[100px]" />
    );

  if (session?.user.id) user = await getUserById(session?.user?.id);

  return (
    <main className="menu-blur w-full h-[100vh] py-[100px] bg-[#eff3f6]">
      <section className=" flex flex-col md:flex-row gap-5 mx-auto w-full max-w-[100rem] max-[1700px]:max-w-[90%] max-[500px]:max-w-[95%]">
        <SideBar />

        <div className="w-full">
          <MainContent
            name={user?.name}
            image={user?.image}
            createdAt={user?.createdAt}
            provider={user?.accounts[0].provider}
            id={user?.id}
          />

          <Delete id={user?.id}/>
        </div>
      </section>
    </main>
  );
}

export default page;
