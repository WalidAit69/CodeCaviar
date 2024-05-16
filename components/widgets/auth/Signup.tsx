import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { signUpShema, signUpValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { SignUp } from "@/app/auth/action";
import { useState } from "react";
import { ChevronLeft, Eye, EyeOff, Loader2 } from "lucide-react";

interface Props {
  setRegistrationType: React.Dispatch<React.SetStateAction<string>>;
}

const Signup = ({ setRegistrationType }: Props) => {
  const [loading, setloading] = useState(false);
  const [showPass, setshowPass] = useState(false);
  const { toast } = useToast();
  const form = useForm<signUpValues>({
    resolver: zodResolver(signUpShema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: signUpValues) {
    try {
      setloading(true);
      const res = await SignUp(data);
      toast({ description: `${res?.msg}` });
      setRegistrationType("signin");
    } catch (error) {
      console.log(error);
      toast({ description: `${error}`, variant: "destructive" });
    } finally {
      setloading(false);
    }
  }

  return (
    <div>
      <div>
        <Button
          disabled={loading}
          variant={"outline"}
          size={"iconsm"}
          onClick={() => setRegistrationType("")}
        >
          <ChevronLeft />
        </Button>
        <div className="flex flex-col mt-8 gap-2">
          <span className="font-Monument text-xl sm:text-2xl font-[600] mt-5">
            Join to unlock the best of Morocco.
          </span>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mt-4"
        >
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Full Name"
                    className="h-12"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                      placeholder="Password"
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

          <Button disabled={loading} className="mt-5">
            {loading ? (
              <Loader2 size={25} className="mx-auto my-10 animate-spin" />
            ) : (
              "Sign up"
            )}
          </Button>
        </form>
      </Form>

      <div className="flex flex-col gap-2 items-center mt-6">
        <div className="relative w-full items-center justify-center flex">
          <span className="bg-white dark:bg-black z-10 px-2">
            Already a member?
          </span>
          <div className="bg-slate-600 w-full h-[1px] absolute"></div>
        </div>
        <span>
          <button
            disabled={loading}
            className="text-start underline w-fit"
            onClick={() => setRegistrationType("signin")}
          >
            Sign in
          </button>{" "}
          to your account.
        </span>
      </div>
    </div>
  );
};

export default Signup;
