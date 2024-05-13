import prisma from "@/lib/prisma";

export async function getPostBySlug(slug: string) {
  try {
    const post = await prisma.post.findUnique({ where: { slug } });

    return post;
  } catch (error) {
    throw error;
  }
}

export async function getPostById(id: string) {
  try {
    const post = await prisma.post.findUnique({ where: { id } });

    return post;
  } catch (error) {
    throw error;
  }
}

export async function getPosts() {
  try {
    const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });

    return posts;
  } catch (error) {
    throw error;
  }
}
