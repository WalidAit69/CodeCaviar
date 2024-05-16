import DashboardCard from "@/components/widgets/dashboard/DashboardCard";
import prisma from "@/lib/prisma";
import React from "react";

async function page() {
  const [posts, users] = await Promise.all([
    await prisma.post.findMany(),
    await prisma.user.findMany(),
  ]);

  const categories = [
    {
      title: "Users",
      description: "active users",
      content: "",
      footer: `${users.length.toString()} users`,
    },
    {
      title: "Posts",
      description: "number of clicks",
      content: "",
      footer: `${posts.length.toString()} posts`,
    },
    {
      title: "Templates",
      description: "number of templates",
      content: "",
      footer: `${posts.length.toString()} posts`,
    },
    {
      title: "Designs",
      description: "number of designs",
      content: "",
      footer: `${posts.length.toString()} posts`,
      soon: true,
    },
    {
      title: "Projects",
      description: "number of projects",
      content: "",
      footer: `${posts.length.toString()} posts`,
      soon: true,
    },
  ];

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center justify-center">
        {categories.map((category, index) => (
          <DashboardCard {...category} key={index} />
        ))}
      </div>
    </section>
  );
}

export default page;
