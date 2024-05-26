"use client";

import React, { useState } from "react";
import { IconUserCircle } from "@tabler/icons-react";
import { IconLock } from "@tabler/icons-react";
import { IconBellRinging } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";
import { useSettings } from "@/store/store";
import Image from "next/image";
import { Button } from "../ui/button";
import { IconPhoto } from "@tabler/icons-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import avatarPlaceholder from "@/assets/images/avatar_placeholder.png";
import { UpdateUser } from "@/app/(protected)/admin/users/actions";
import { Loader2 } from "lucide-react";

interface User {
  name: string | null | undefined;
  image: string | null | undefined;
  id: string | undefined;
  role?: string;
  headadmin?: string | null | undefined;
  createdAt: Date | undefined;
  provider: string | undefined;
}

function MainContent({ name, image, id, provider, createdAt }: User) {
  const { active } = useSettings();
  const [fullname, setfullname] = useState(name);
  const [NewImage, setNewImage] = useState(image);
  const [file, setfile] = useState<File>();
  const [loading, setloading] = useState(false);

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setfile(file);
      setNewImage(URL.createObjectURL(file));
    }
  }

  async function onSubmit() {
    const formData = new FormData();
    file && formData.append("image", file);
    fullname && formData.append("name", fullname);
    id && formData.append("id", id);

    try {
      setloading(true);
      await UpdateUser(formData);
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  }

  return (
    <div className="w-full bg-white rounded-xl p-5 space-y-7">
      <div className="flex items-center justify-between relative">
        <span className="font-Monument text-lg flex items-center gap-2 mt-7 sm:mt-0">
          {SideBarLinks[active].icon}
          {SideBarLinks[active].title}
        </span>

        <div className="flex items-center gap-2 absolute top-0 right-0">
          <Image
            src={
              provider === "google"
                ? "https://ucarecdn.com/3251b338-5ba4-4e18-ab35-91457aba54a5/"
                : "https://ucarecdn.com/d8d655ba-a2f9-4cdd-8eae-1fc6fda0b6fc/"
            }
            alt="provider"
            width={20}
            height={20}
            className="sm:w-5 sm:h-5 w-4 h-4"
          />
          <span className="text-[#422caf] font-bold text-sm">
            Member since {createdAt?.toLocaleDateString("en-US")}
          </span>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-4">
          <input
            id="newimage"
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => handleImage(e)}
          />
          <Image
            src={NewImage || avatarPlaceholder}
            width={70}
            height={70}
            alt="profile pic"
            className="rounded-full"
          />
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              className="text-[#422caf] border-[#422caf]"
            >
              <label
                htmlFor="newimage"
                className="cursor-pointer flex items-center gap-2"
              >
                <IconPhoto stroke={1.5} size={15} />
                Change
              </label>
            </Button>

            <Button
              onClick={() => setNewImage("")}
              variant="outline"
              className="text-[#422caf] flex items-center gap-2 border-[#422caf]"
            >
              <IconTrash stroke={1.5} size={15} />
              Remove
            </Button>
          </div>
        </div>

        <div className="space-y-5 mt-10">
          <div className="space-y-1">
            <Label htmlFor="name" className="w-full h-full font-bold">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder={name || "Change your name"}
              onChange={(e) => {
                setfullname(e.target.value);
              }}
            />
          </div>
        </div>

        <Button
          disabled={loading}
          onClick={onSubmit}
          className="mt-10 w-[200px]"
        >
          {loading ? (
            <Loader2 size={25} className="mx-auto my-10 animate-spin" />
          ) : (
            "Update"
          )}
        </Button>
      </div>

      
    </div>
  );
}

export default MainContent;

const SideBarLinks = [
  {
    title: "Account",
    icon: <IconUserCircle stroke={1.5} />,
  },
  {
    title: "Security",
    icon: <IconLock stroke={1.5} />,
  },
  {
    title: "Notifications",
    icon: <IconBellRinging stroke={1.5} />,
  },
  {
    title: "Delete",
    icon: <IconTrash stroke={1.5} />,
  },
];
