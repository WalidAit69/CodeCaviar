"use client";

import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useForm } from "react-hook-form";
import { OTPSchema, OTPValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { VerifyOTP } from "@/app/auth/action";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

function OtpVerify({ email }: { email: string }) {
  const router = useRouter();

  const { toast } = useToast();
  const [loading, setloading] = useState(false);

  const form = useForm<OTPValues>({
    resolver: zodResolver(OTPSchema),
    defaultValues: {
      pin: "",
      email: email,
    },
  });

  async function onSubmit(data: OTPValues) {
    try {
      setloading(true);
      const res = await VerifyOTP(data);
      if (res) {
        router.push(`/auth/reset/otp?otp=${res.existingOTP}&email=${res.email}`);
      }
    } catch (error) {
      console.log(error);
      toast({ description: `${error}`, variant: "destructive" });
    } finally {
      setloading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot className="w-14 h-14" index={0} />
                    <InputOTPSlot className="w-14 h-14" index={1} />
                    <InputOTPSlot className="w-14 h-14" index={2} />
                    <InputOTPSlot className="w-14 h-14" index={3} />
                    <InputOTPSlot className="w-14 h-14" index={4} />
                    <InputOTPSlot className="w-14 h-14" index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading} className="w-28" type="submit">
          {loading ? (
            <Loader2 size={25} className="mx-auto my-10 animate-spin" />
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default OtpVerify;
