import DashboardCard from "@/components/widgets/dashboard/DashboardCard";
import prisma from "@/lib/prisma";
import React from "react";

async function page() {
  const [posts, users] = await Promise.all([
    await prisma.post.findMany(),
    await prisma.user.findMany(),
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard
        title="Posts"
        description="number of clicks"
        content=""
        footer={`${posts.length.toString()} posts`}
      />

      <DashboardCard
        title="Users"
        description="active users"
        content=""
        footer={`${users.length.toString()} users`}
      />
    </div>
  );
}

export default page;
