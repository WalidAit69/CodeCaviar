"use server";

import prisma from "@/lib/prisma";
import { postValues } from "@/lib/validation";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Configure AWS SDK
const s3Client = new S3Client({
  region: "eu-west-3",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY || "",
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
  },
});

async function uploadToS3(formData: FormData): Promise<string | undefined> {
  try {
    const image = formData.get("image") as File;
    if (!image) {
      throw new Error("No image file found in FormData.");
    }

    const imageStream = Buffer.from(await image.arrayBuffer());
    const filename = `${crypto.randomUUID()}-${image.name}`;

    const params = {
      Bucket: process.env.BUCKETNAME,
      Key: `posts/${filename}`,
      Body: imageStream,
      ACL: "public-read",
      ContentType: image.type,
    };

    // Upload the image to S3
    // @ts-ignore
    const command = new PutObjectCommand(params);
    const uploadResult = await s3Client.send(command);
    console.log("Image uploaded successfully:", uploadResult);
    return `https://${process.env.BUCKETNAME}.s3.amazonaws.com/posts/${filename}`;
  } catch (error) {
    console.error("Error uploading image to S3:", error);
  }
}

export async function AddPost(data: postValues, formData: FormData) {
  try {
    const image = await uploadToS3(formData);

    if (!image) {
      throw new Error("Image upload failed.");
    }

    const codeblocksData = data.codeblock;

    const post = await prisma.post.create({
      data: {
        ...data,
        image,
        codeblock: {
          create: codeblocksData.map(
            (block: { content: string; language: string }) => ({
              content: block.content,
              language: block.language,
            })
          ),
        },
      },
    });

    return post;
  } catch (error) {
    console.error("Error adding post:", error);
    throw error;
  }
}
