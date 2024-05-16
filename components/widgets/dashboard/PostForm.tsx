"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { postSchema, postValues } from "@/lib/validation";
import { useToast } from "../../ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { AddPost, UpdatePost } from "@/app/(protected)/admin/posts/actions";
import { Label } from "../../ui/label";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import AddCodeBlock from "./AddCodeBlock";

function PostForm({ post }: { post?: postValues | null }) {
  const { toast } = useToast();
  const [file, setfile] = useState<File | null>(null);
  const [loading, setloading] = useState(false);

  const form = useForm<postValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title,
      description: post?.description,
      slug: post?.slug,
      codeblock: post?.codeblock,
      tech: post?.tech || [],
    },
  });

  async function onSubmit(data: postValues) {
    const formData = new FormData();

    if (file) {
      formData.append("image", file);
    } else if (!file && !post?.image) {
      toast({
        variant: "destructive",
        description: `Upload image`,
      });
      return null;
    }

    try {
      setloading(true);
      if (post && post.id) {
        await UpdatePost(post.id, data, formData);
        toast({ description: "Post Updated." });
      } else {
        await AddPost(data, formData);
        toast({ description: "Post added." });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: `${error.message}`,
      });
    } finally {
      setloading(false);
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    file && setfile(file);
  };

  const codeBlockError = form.getFieldState("codeblock").error?.message;
  const imageError = form.getFieldState("image").error?.message;
  const codeBlock = form.watch("codeblock");

  
  return (
    <>
      <div className="w-full">
        {file && (
          <Image
            className="flex self-center mx-auto w-[40%] object-cover rounded-lg"
            width={400}
            height={100}
            src={URL.createObjectURL(file)}
            alt="post"
          />
        )}
        {!file && post?.image && (
          <Image
            className="flex self-center mx-auto w-[40%] object-cover rounded-lg"
            width={400}
            height={100}
            src={post?.image}
            alt="post"
          />
        )}

        <Label>Imgae</Label>
        <Input type="file" onChange={handleImageChange} />
        {imageError && (
          <span className="text-sm text-destructive">{imageError}</span>
        )}
      </div>

      <div>
        <AddCodeBlock Postform={form} />
        {!codeBlock && codeBlockError && (
          <span className="text-sm text-destructive">{codeBlockError}</span>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-2 w-full">
            <>
              {/* {codeBlock &&
              codeBlock.map((block, index) => (
                <div key={index}>
                  <div className="w-full gap-2 flex">
                    <Textarea
                      className="w-[80%] min-h-fit"
                      placeholder="Code..."
                      {...form.register(`codeblock.${index}.content`)}
                    />

                    <Input
                      type="text"
                      className="w-[20%]"
                      placeholder="Language..."
                      {...form.register(`codeblock.${index}.language`)}
                    />
                  </div>
                  {block.content && (
                    <CodeBlock
                      codeString={block.content}
                      language={block.language}
                    />
                  )}
                </div>
              ))}

            <Button
              disabled={loading}
              type="button"
              className="w-52"
              onClick={handleAddCodeBlock}
            >
              Add
            </Button> */}
            </>
          </div>

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
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="Unique Slug..." {...field} />
                </FormControl>
                <FormDescription>This is used to fetch data.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tags input field */}
          <FormField
            control={form.control}
            name="tech"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technologies</FormLabel>
                <FormControl>
                  <TagsInput
                    {...field}
                    onlyUnique
                    className="flex items-center h-full w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </FormControl>
                <FormDescription>
                  Add technologies related to the project.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <Loader2 size={22} className="mx-auto my-10 animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}

export default PostForm;
