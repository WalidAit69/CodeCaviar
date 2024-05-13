"use client";

import { useEffect, useState } from "react";
import Signin from "./widgets/Signin";
import Signup from "./widgets/Signup";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { FiGithub, FiMail } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { Default_Login_Redirect } from "@/routes";
import { useSearchParams } from "next/navigation";
import { useToast } from "./ui/use-toast";

const AuthModal = () => {
  const { toast } = useToast();
  const [RegistrationType, setRegistrationType] = useState("");

  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  function onClick(provider: "google" | "github") {
    signIn(provider, {
      callbackUrl: Default_Login_Redirect,
    });
  }

  useEffect(() => {
    urlError && toast({ description: `${urlError}`, variant: "destructive"});
  }, [urlError]);

  return (
    <div
      className={cn(
        `bg-white dark:bg-black p-12 rounded-xl h-[75%] w-[500px] overflow-y-auto ${
          RegistrationType && "h-[90%]"
        } ${RegistrationType === "signup" && "registrationSignUp"}`
      )}
    >
      <div className="flex flex-col justify-between h-full gap-5">
        {!RegistrationType && (
          <div>
            <div>
              {/* <img src={logo} alt="logo" /> */}
              <span className="font-Monument text-2xl font-[600] mt-5">
                Sign in to unlock the best of Code caviar.
              </span>
            </div>

            <div className="flex flex-col mt-16 gap-5">
              <Button
                onClick={() => onClick("google")}
                variant={"outline"}
                className="relative w-full h-14 rounded-3xl text-md bg-transparent border-2 border-gray-600 font-bold"
              >
                <div className="absolute left-[10%]">
                  <FaGoogle
                    size={22}
                    className="text-gray-600 dark:text-white"
                  />
                </div>
                Continue with Google
              </Button>

              <Button
                onClick={() => onClick("github")}
                variant={"outline"}
                className="relative w-full h-14 rounded-3xl text-md bg-transparent border-2 border-gray-600 font-bold"
              >
                <div className="absolute left-[10%]">
                  <FiGithub
                    size={22}
                    className="text-gray-600 dark:text-white"
                  />
                </div>
                Continue with Github
              </Button>

              <Button
                variant={"outline"}
                className="relative w-full h-14 rounded-3xl text-md bg-transparent border-2 border-gray-600 font-bold"
                onClick={() => setRegistrationType("signin")}
              >
                <div className="absolute left-[10%]">
                  <FiMail size={22} className="text-gray-600 dark:text-white" />
                </div>
                Continue with Email
              </Button>
            </div>
          </div>
        )}

        {RegistrationType === "signin" && (
          <Signin setRegistrationType={setRegistrationType} />
        )}

        {RegistrationType === "signup" && (
          <Signup setRegistrationType={setRegistrationType} />
        )}

        <div className="text-center text-xs pb-2 flex gap-1 flex-col mt-5">
          <p>
            By proceeding, you agree to our Terms of Use and confirm you have
            read our Privacy and Cookie Statement.
          </p>
          <p>
            This site is protected by reCAPTCHA and the Google Privacy Policy
            and Terms of Service apply.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
