import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { signInShema, signInValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useToast } from "../ui/use-toast";
import { SignIn } from "@/app/auth/action";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useState } from "react";

interface Props {
  setRegistrationType: React.Dispatch<React.SetStateAction<string>>;
}

const Signin = ({ setRegistrationType }: Props) => {
  const [loading, setloading] = useState(false);
  const { toast } = useToast();

  const form = useForm<signInValues>({
    resolver: zodResolver(signInShema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: signInValues) {
    try {
      setloading(true);
      await SignIn(data);
      window.location.reload();
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
          {/* <img src={logo} alt="logo" /> */}
          <span className="font-Monument text-2xl font-[600] mt-5">
            Welcome back.
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
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    className="h-12"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button disabled={loading} className="text-start underline w-fit">
            Forgot password?
          </button>

          <Button disabled={loading}>
            {loading ? (
              <Loader2 size={25} className="mx-auto my-10 animate-spin" />
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </Form>

      <div className="flex flex-col gap-2 items-center mt-5">
        <div className="relative w-full items-center justify-center flex">
          <span className="bg-white dark:bg-black z-10 px-2">
            Not a member?
          </span>
          <div className="bg-slate-600 w-full h-[1px] absolute"></div>
        </div>
        <span>
          <button
            disabled={loading}
            className="text-start underline w-fit"
            onClick={() => setRegistrationType("signup")}
          >
            Join
          </button>{" "}
          to unlock the best of Morocco.
        </span>
      </div>
    </div>
  );
};

export default Signin;
