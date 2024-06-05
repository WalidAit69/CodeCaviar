"use client";

import { useForm } from "react-hook-form";
import { templateSchema, templateValues } from "@/lib/validation";
import { useToast } from "@/components/ui/use-toast";
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
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddTemplate } from "@/app/(protected)/admin/templates/actions";

function TemplateForm({ template }: { template?: templateValues | null }) {
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setloading] = useState(false);

  const form = useForm<templateValues>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      title: template?.title,
      description: template?.description,
      slug: template?.slug,
      types: template?.types || [],
      link: template?.link,
    },
  });

  async function onSubmit(data: templateValues) {
    const formData = new FormData();

    if (files && files.length > 0) {
      files.forEach((file) => {
        formData.append("images", file);
      });

    } else if (!files && !template?.images) {
      toast({
        variant: "destructive",
        description: `Upload image`,
      });
      return null;
    }

    try {
      setloading(true);
      if (template && template.id) {
        // await UpdatePost(template.id, data, formData);
        toast({ description: "Post Updated." });
      } else {
        await AddTemplate(data, formData);
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
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      setFiles(Array.from(selectedFiles));
    }
  };

  const imageError = form.getFieldState("images").error?.message;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="w-full">
          <div className="flex items-center flex-wrap gap-2">
            {files &&
              files.map((file, index) => (
                <Image
                  key={index}
                  className="object-cover rounded-lg"
                  width={300}
                  height={200}
                  src={URL.createObjectURL(file)}
                  alt="template"
                />
              ))}
          </div>
          <div className="flex items-center flex-wrap gap-2">
            {!files &&
              template?.images &&
              template?.images.map((image, index) => (
                <Image
                  key={index}
                  className="object-cover rounded-lg"
                  width={300}
                  height={200}
                  src={image}
                  alt="template"
                />
              ))}
          </div>

          <Label>Imgae</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            multiple
          />
          {imageError && (
            <span className="text-sm text-destructive">{imageError}</span>
          )}
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
                <Input
                  className="h-14"
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
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Template link</FormLabel>
              <FormControl>
                <Input
                  className="h-14"
                  placeholder="Description..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tags input field */}
        <FormField
          control={form.control}
          name="types"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Technologies</FormLabel>
              <FormControl>
                <TagsInput
                  {...field}
                  onlyUnique
                  className="flex items-center h-14 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </FormControl>
              <FormDescription>
                Add technologies related to the project.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full sm:w-[300px]"
          disabled={loading}
        >
          {loading ? (
            <Loader2 size={22} className="mx-auto my-10 animate-spin" />
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default TemplateForm;
