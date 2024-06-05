"use server";

import { getPostById, getPostBySlug } from "@/app/data/post";
import { getTemplateBySlug } from "@/app/data/templates";
import { currentRole } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { codeBlockValues, postValues, templateValues } from "@/lib/validation";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { redirect } from "next/navigation";

// Configure AWS SDK
const s3Client = new S3Client({
  region: "eu-west-3",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY || "",
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
  },
});

async function uploadToS3(formData: FormData): Promise<string[] | undefined> {
  try {
    const images = formData.getAll("images") as File[];
    if (!images.length) {
      throw new Error("No image file found in FormData.");
    }

    const uploadPromises = images.map(async (image) => {
      const ext = image.type.split("/")[1];
      const imageStream = Buffer.from(await image.arrayBuffer());
      const filename =
        Date.now() +
        "-" +
        Math.random().toString(36).substring(2, 15) +
        "." +
        ext;

      const params = {
        Bucket: process.env.BUCKETNAME,
        Key: `templates/${filename}`,
        Body: imageStream,
        ACL: "public-read",
        ContentType: image.type,
      };

      // Upload the image to S3
      // @ts-ignore
      const command = new PutObjectCommand(params);
      const uploadResult = await s3Client.send(command);
      console.log("Image uploaded successfully:", uploadResult);
      return `https://${process.env.BUCKETNAME}.s3.amazonaws.com/templates/${filename}`;
    });

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
  } catch (error) {
    console.error("Error uploading image to S3:", error);
  }
}

async function DeleteImageFromS3(image: string) {
  try {
    // Extract the key or filename from the image URL
    const imageUrl = image;
    const imageUrlParts = imageUrl.split("/");
    const key = imageUrlParts[imageUrlParts.length - 1];

    // Delete the object from S3 bucket
    const deleteParams = {
      Bucket: process.env.BUCKETNAME,
      Key: `posts/${key}`,
    };

    const deleteResponse = await s3Client.send(
      new DeleteObjectCommand(deleteParams)
    );

    // Log response from S3 delete operation for debugging
    console.log("S3 delete response:", deleteResponse);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function AddTemplate(data: templateValues, formData: FormData) {
  try {
    const role = await currentRole();

    if (role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    const template = await getTemplateBySlug(data.slug);

    if (template) {
      throw new Error("Slug already used");
    }

    const images = await uploadToS3(formData);

    if (!images) {
      throw new Error("Image upload failed.");
    }

    await prisma.template.create({
      data: {
        ...data,
        images,
      },
    });

    redirect("/admin/templates");
  } catch (error) {
    console.error("Error adding post:", error);
    throw error;
  }
}

export async function UpdatePost(
  id: string,
  data: postValues,
  formData: FormData
) {
  try {
    const role = await currentRole();

    if (role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    const post = await getPostById(id);

    if (!post) {
      throw new Error("Post not found");
    }

    // Check if the slug is being changed and if it's already used
    if (data.slug !== post.slug) {
      const postWithNewSlug = await getPostBySlug(data.slug);

      if (postWithNewSlug) {
        throw new Error("Slug already used");
      }
    }

    let image: string | undefined = post.image;

    if (formData.has("image")) {
      image = await uploadToS3(formData);
      if (!image) {
        throw new Error("Image upload failed.");
      }

      await DeleteImageFromS3(post.image);
    }

    const codeblocksData = data.codeblock;

    await prisma.post.update({
      where: { id },
      data: {
        ...data,
        image,
        codeblock: {
          deleteMany: {},
          create: codeblocksData.map((block: codeBlockValues) => ({
            content: block.content,
            language: block.language,
            description: block.description,
            title: block.title,
          })),
        },
      },
    });

    redirect("/admin/posts");
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}

export async function DeletePost(id: string) {
  try {
    const role = await currentRole();

    if (role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    const post = await getPostById(id);

    if (!post) {
      throw new Error("Post not found");
    }

    await DeleteImageFromS3(post.image);

    // Delete the post from the database
    await prisma.post.delete({
      where: { id },
    });
  } catch (error) {
    console.log("Error deleting post");
    throw error;
  }
}

export async function ToggleStatus(id: string, status: boolean) {
  try {
    const role = await currentRole();

    if (role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    await prisma.post.update({
      where: { id },
      data: { active: !status },
    });

    console.log("updated");
  } catch (error) {
    console.log("Error updating post");
    throw error;
  }
}
