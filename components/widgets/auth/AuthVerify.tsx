"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { TokenVerify } from "@/app/auth/action";
import ErrorBadge from "../ErrorBadge";
import SuccessBadge from "../SuccessBadge";
import Link from "next/link";

function AuthVerify() {
  const [message, setmessage] = useState("");
  const [error, seterror] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (message || error) return;

    if (!token) {
      seterror("Unauthorized!");

      redirect("/");
    }

    TokenVerify(token)
      .then((data) => {
        setmessage(data.msg);
      })
      .catch(() => {
        seterror("Something went wrong");
      });
  }, [token, message, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div
      className="bg-white dark:bg-black p-12 sm:rounded-xl h-full flex items-center justify-center sm:h-auto w-full sm:w-[500px] overflow-y-auto relative z-[2]
    shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] authmodal"
    >
      <div className="flex flex-col items-center justify-center h-full gap-5">
        <div>
          <div className="flex items-center gap-4">
            <Image
              width={40}
              height={40}
              src={
                !error && !message
                  ? "https://ucarecdn.com/f44e4807-b1f3-4418-ac10-4a654ca37301/"
                  : message
                  ? "https://ucarecdn.com/b2058d39-f093-40ce-acd5-c3b73e9e56ce/"
                  : "https://ucarecdn.com/2e6b0f05-dbd0-4c0b-9862-f6a5246662c8/"
              }
              alt="logo"
            />

            <span className="font-Monument text-xl sm:text-2xl font-[600]">
              {!error && !message && "Verifiying..."}
              {message && "Welcome!"}
              {!message && error && "Please retry"}
            </span>
          </div>

          {!error && !message && (
            <div className="w-full flex items-center justify-center mt-16">
              <Image
                src={"/loading.gif"}
                width={50}
                height={50}
                alt="loading"
              />
            </div>
          )}

          <div className="mt-16">
            {message && <SuccessBadge msg={message} />}

            {!message && error && <ErrorBadge error={error} />}
          </div>

          <div className="flex flex-col mt-16 gap-5">
            <Button
              disabled={!error && !message}
              variant={"outline"}
              className="relative w-full h-14 rounded-3xl text-md bg-transparent border-2 border-gray-600 font-bold"
            >
              <Link href={"/auth"}>
                {!error && !message && "Verifiying..."}
                {message && "Sign in"}
                {!message && error && "Please retry"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthVerify;
