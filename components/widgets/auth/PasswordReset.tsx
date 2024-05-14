"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ResetShema, ResetValues } from "@/lib/validation";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import OtpVerify from "./OtpVerify";
import { SendOtpCode } from "@/app/auth/action";
import { Loader2 } from "lucide-react";

function PasswordReset() {
  const { toast } = useToast();
  const [OTPstep, setOTPstep] = useState(false);
  const [loading, setloading] = useState(false);

  const form = useForm<ResetValues>({
    resolver: zodResolver(ResetShema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: ResetValues) {
    try {
      setloading(true);
      const res = await SendOtpCode(data);
      toast({ description: `${res?.msg}` });
      setOTPstep(true);
    } catch (error) {
      toast({ description: `${error}`, variant: "destructive" });
      console.log(error);
    } finally {
      setloading(false);
    }
  }

  const email = form.watch("email");

  return (
    <div
      className="bg-white dark:bg-black p-12 rounded-xl max-h-[100%] w-[500px] z-[2] overflow-y-auto relative 
    shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] authmodal"
    >
      <div>
        <div className="flex flex-col">
          <Image
            width={40}
            height={40}
            src="https://ucarecdn.com/f44e4807-b1f3-4418-ac10-4a654ca37301/"
            alt="logo"
            className="mb-4"
          />
          <span className="font-Monument text-2xl font-[600] mt-5">
            Reset password
          </span>
          <span className="text-muted-foreground text-base">
            Enter your email to reset your password
          </span>
        </div>
      </div>

      {!OTPstep && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 mt-8"
          >
            <FormField
              control={form.control}
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

            <Button disabled={loading} type="submit">
              {loading ? (
                <Loader2 size={25} className="mx-auto my-10 animate-spin" />
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        </Form>
      )}

      <div className="w-full flex items-center justify-center my-10">
        {OTPstep && <OtpVerify email={email} />}
      </div>

      <div className="flex flex-col gap-2 items-center mt-5">
        <div className="relative w-full items-center justify-center flex">
          <span className="bg-white dark:bg-black z-10 px-2">
            Remember your password?
          </span>
          <div className="bg-slate-600 w-full h-[1px] absolute"></div>
        </div>
        <span>
          <button className="text-start underline w-fit">
            <Link href={"/auth"}>Sign in</Link>
          </button>{" "}
          to your account.
        </span>
      </div>
    </div>
  );
}

export default PasswordReset;
