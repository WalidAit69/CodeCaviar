import prisma from "@/lib/prisma";

export async function getTemplateBySlugMeta(slug: string) {
  try {
    const Template = await prisma.template.findUnique({
      where: { slug },
      select: { title: true, description: true },
    });

    return Template;
  } catch (error) {
    throw error;
  }
}

export async function getTemplateBySlug(slug: string) {
  try {
    const Template = await prisma.template.findUnique({
      where: { slug },
    });

    return Template;
  } catch (error) {
    throw error;
  }
}

export async function getTemplateById(id: string) {
  try {
    const Template = await prisma.template.findUnique({ where: { id } });

    return Template;
  } catch (error) {
    throw error;
  }
}

export async function getTemplates() {
  try {
    const Templates = await prisma.template.findMany({
      orderBy: { createdAt: "desc" },
    });

    return Templates;
  } catch (error) {
    throw error;
  }
}

export async function getActiveTemplates() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      where: { active: true },
      include: { codeblock: true },
    });

    return posts;
  } catch (error) {
    throw error;
  }
}
