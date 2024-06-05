import { getPosts } from "@/app/data/post";
import { getTemplates } from "@/app/data/templates";
import { getUsers } from "@/app/data/user";
import DashboardCard from "@/components/widgets/dashboard/DashboardCard";
import React from "react";

async function page() {
  const [posts, users, templates] = await Promise.all([
    await getPosts(),
    await getUsers(),
    await getTemplates(),
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
      footer: `${templates.length.toString()} posts`,
    },
    {
      title: "Designs",
      description: "number of designs",
      content: "",
      footer: `0`,
      soon: true,
    },
    {
      title: "Projects",
      description: "number of projects",
      content: "",
      footer: `0`,
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
