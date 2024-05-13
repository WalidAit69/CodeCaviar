import AuthModal from "@/components/AuthModal";
import React from "react";
import { auth } from "../auth";
import { redirect } from "next/navigation";
import Image from "next/image";

async function page() {
  const session = await auth();

  session && redirect("/");

  return (
    <section className="h-[100vh] pt-[70px] flex items-center justify-center relative">
      <div className="absolute inset-0 backdrop-filter backdrop-blur-md backdrop-brightness-25 brightness-95 z-[1]"></div>

      <div>
        <Image
          src="https://ucarecdn.com/81eca962-2f3d-4052-9d93-f57b9a4752c5/"
          width={400}
          height={400}
          alt=""
          className="absolute bottom-0 left-0 select-none"
        />

        <Image
          src="https://ucarecdn.com/36e4474c-c0de-4189-a658-e550ca3ef8e3/"
          width={100}
          height={100}
          alt=""
          className="absolute bottom-[40%] right-[10%] blur-sm select-none"
        />

        <Image
          src="https://ucarecdn.com/9b24e6e2-0332-42b1-979b-307abd41adf3/"
          width={100}
          height={100}
          alt=""
          className="absolute top-[0%] right-[50%] rotate-90 select-none"
        />
      </div>

      <AuthModal />
    </section>
  );
}

export default page;
