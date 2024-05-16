import React from "react";
import { CodeBlock } from "../../CodeBlock";
import { Textarea } from "@/components/ui/textarea";
import "react-tagsinput/react-tagsinput.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { codeBlockSchema, codeBlockValues } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Trash } from "lucide-react";

interface Props {
  Postform: any;
}

function AddCodeBlock({ Postform }: Props) {
  const form = useForm<codeBlockValues>({
    resolver: zodResolver(codeBlockSchema),
    defaultValues: {
      content: "",
      language: "",
      title: "",
      decription: "",
    },
  });

  const codeBlock = Postform.watch("codeblock");

  const handleAddCodeBlock = (data: codeBlockValues) => {
    const currentCodeblock = codeBlock || [];
    const newCodeblock = [...currentCodeblock, data];
    Postform.setValue("codeblock", newCodeblock);
    form.reset();
  };

  const handleDelete = (index: number) => {
    const updatedCodeBlock = codeBlock;
    updatedCodeBlock.splice(index, 1);
    Postform.setValue("codeblock", updatedCodeBlock);
  };

  return (
    <div className="mt-12">
      <Dialog>
        <DialogTrigger asChild className="w-full">
          <Button variant="secondary">Add Code Block</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px] overflow-y-auto z-[9999]">
          <DialogHeader>
            <DialogTitle>Add Code Block</DialogTitle>
            <DialogDescription>
              Add code block to your post here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleAddCodeBlock)}
              className="w-full"
            >
              <div className="grid gap-4 w-full mb-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Title..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="decription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          className="min-h-fit h-32"
                          placeholder="Description..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language</FormLabel>
                      <FormControl>
                        <Input placeholder="Language..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code</FormLabel>
                      <FormControl>
                        <Textarea
                          className="min-h-fit h-32"
                          placeholder="Code..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit">Save changes</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {codeBlock &&
        codeBlock.map(
          (code: { content: string; language: string }, index: number) => (
            <div key={index} className="relative">
              <CodeBlock codeString={code.content} language={code.language} />

              <Button
                onClick={() => {
                  handleDelete(index);
                }}
                className="absolute flex items-center justify-center right-[10px] top-2 w-7 h-7 p-0"
              >
                <Trash size={15} />
              </Button>
            </div>
          )
        )}
    </div>
  );
}

export default AddCodeBlock;
