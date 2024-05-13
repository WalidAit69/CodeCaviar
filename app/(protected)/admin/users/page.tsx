import prisma from "@/lib/prisma";
import Image from "next/image";
import React from "react";
import { BadgeCheck, Lock } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DashUserBtn from "@/components/widgets/dashboard/DashUserBtn";
import UserAdminBtn from "@/components/widgets/dashboard/UserAdminBtn";
import { auth } from "@/app/auth";

async function page() {
  const [users] = await Promise.all([
    prisma.user.findMany(),
    // prisma.session.findMany(),
  ]);

  // const onlineUserIds = sessions.map((session) => session.userId);

  // const session = await auth();
  // const isHeadAdmin = session?.user.headadmin;
  const isHeadAdmin = true;

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold">Users</h1>
      </div>

      <ul role="list" className="divide-y divide-gray-100">
        {users.map((user) => (
          <li key={user.email} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <Image
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src={user.image || ""}
                alt="profile picture"
                width={50}
                height={50}
              />
              <div className="min-w-0 flex-auto">
                <p className="text-base font-semibold leading-6 text-gray-900 flex items-center gap-1">
                  {user.name}
                  {user.emailVerified && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <BadgeCheck className="text-emerald-500" size={15} />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Email Verified</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900 flex items-center gap-2">
                  {user.role || "user"}
                  {user.headadmin && <Lock size={13} />}
                </p>

                {/* {onlineUserIds.includes(user.id) && (
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full bg-emerald-500/20 p-1 animate-pulse">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <p className="text-xs leading-5 text-gray-500">Online</p>
                  </div>
                )} */}
              </div>

              {!user.headadmin && (
                <div className="flex items-center gap-2">
                  {isHeadAdmin && (
                    <UserAdminBtn id={user.id} role={user.role || ""} isHeadAdmin={isHeadAdmin}/>
                  )}

                  <DashUserBtn id={user.id} />
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default page;
