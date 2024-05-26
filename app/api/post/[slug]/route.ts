import { getPostBySlug } from "@/app/data/post";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const slug = searchParams.get("slug");

  if (!slug) {
    throw new Error("Slug is required");
  }

  const post = await getPostBySlug(slug);

  if (!post) {
    throw new Error("Snippet not found");
  } else {
    return new Response(JSON.stringify(post), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
