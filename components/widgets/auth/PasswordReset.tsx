import { Button } from "@/components/ui/button";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

function PasswordReset() {
  return (
    <div>
      <div>
        <div className="flex flex-col mt-8 gap-2">
          {/* <img src={logo} alt="logo" /> */}
          <span className="font-Monument text-2xl font-[600] mt-5">
            Welcome back.
          </span>
        </div>
      </div>
      <form className="flex flex-col gap-6 mt-4">
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email address"
                  className="h-12"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button>Sign in</Button>
      </form>

      <div className="flex flex-col gap-2 items-center mt-5">
        <div className="relative w-full items-center justify-center flex">
          <span className="bg-white dark:bg-black z-10 px-2">
            Not a member?
          </span>
          <div className="bg-slate-600 w-full h-[1px] absolute"></div>
        </div>
        <span>
          <button className="text-start underline w-fit">Join</button> to unlock
          the best of Morocco.
        </span>
      </div>
    </div>
  );
}

export default PasswordReset;
