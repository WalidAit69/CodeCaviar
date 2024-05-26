"use server";

import { getUserById } from "@/app/data/user";
import { currentRole, currentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";


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

    const ext = image.type.split("/")[1];

    const imageStream = Buffer.from(await image.arrayBuffer());
    const filename = Date.now() + "." + ext;

    const params = {
      Bucket: process.env.BUCKETNAME,
      Key: `users/${filename}`,
      Body: imageStream,
      ACL: "public-read",
      ContentType: image.type,
    };

    // Upload the image to S3
    // @ts-ignore
    const command = new PutObjectCommand(params);
    const uploadResult = await s3Client.send(command);
    console.log("Image uploaded successfully:", uploadResult);
    return `https://${process.env.BUCKETNAME}.s3.amazonaws.com/users/${filename}`;
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
      Key: `users/${key}`,
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

export async function DeleteUser(id: string) {
  try {
    const role = await currentRole();

    if (role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error("User not found");
    }

    if (user.role === "ADMIN") {
      throw new Error("Admin cannot be deleted");
    }

    await prisma.user.delete({ where: { id } });
  } catch (error) {
    console.log("Error deleting user");
    throw error;
  }
}

export async function SelfDeleteUser(id: string) {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error("User not found");
    }

    if (user.id !== id) {
      throw new Error("Unauthorized");
    }

    if (user.role === "ADMIN") {
      throw new Error("Admin cannot be deleted");
    }

    await prisma.user.delete({ where: { id } });
  } catch (error) {
    console.log("Error deleting user");
    throw error;
  }
}

export async function ToggleAdmin(id: string, role: string) {
  try {
    const currentuser = await currentUser();

    if (currentuser?.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    if (!currentuser.headadmin) {
      throw new Error("Only head admins can control roles");
    }

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new Error("User not found");
    }

    await prisma.user.update({
      where: { id },
      data: { role: role === "ADMIN" ? "USER" : "ADMIN" },
    });

    console.log("user updated");
  } catch (error) {
    console.log("Error updating user");
    throw error;
  }
}

export async function UpdateUser(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;

    const user = await getUserById(id);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.id !== id) {
      throw new Error("Unauthorized");
    }

    let image: string | undefined | null = "";

    if (formData.has("image")) {
      image = await uploadToS3(formData);
      if (!image) {
        throw new Error("Image upload failed.");
      }

      if (user.image) {
        await DeleteImageFromS3(user.image);
      }
    }

    await prisma.user.update({
      where: { id },
      data: {
        image: image || user.image,
        name: name || user.name,
      },
    });
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}
