"use client";

import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ResetPassShema, ResetPassShemaValues } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { ResetPassword } from "@/app/auth/action";
import { useRouter } from "next/navigation";

function PassResetForm({ email }: { email: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setloading] = useState(false);
  const [showPass, setshowPass] = useState(false);

  const form = useForm<ResetPassShemaValues>({
    resolver: zodResolver(ResetPassShema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      email: email,
    },
  });

  async function onSubmit(data: ResetPassShemaValues) {
    try {
      setloading(true);
      await ResetPassword(data);
      toast({ description: "Password Changed" });
      router.push("/auth");
    } catch (error) {
      console.log(error);
      toast({ description: `${error}`, variant: "destructive" });
    } finally {
      setloading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 mt-8 z-10"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl className="relative">
                <div>
                  <Input
                    type={showPass ? "text" : "password"}
                    placeholder="Enter your new password"
                    className="h-12"
                    {...field}
                  />
                  <Button
                    type="button"
                    size="iconsm"
                    variant="outline"
                    onClick={() => setshowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full"
                  >
                    {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl className="relative">
                <div>
                  <Input
                    type={showPass ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="h-12"
                    {...field}
                  />
                  <Button
                    type="button"
                    size="iconsm"
                    variant="outline"
                    onClick={() => setshowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full"
                  >
                    {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                  </Button>
                </div>
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
  );
}

export default PassResetForm;
