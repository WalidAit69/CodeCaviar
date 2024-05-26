import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bentogrid";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

export function BentoGridSecond() {
  return (
    <BentoGrid className="md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
          icon={item.icon}
          link={item.link}
        />
      ))}
    </BentoGrid>
  );
}

const items = [
  {
    title: "Website Templates",
    link: "/templates",
    description: "Explore a variety of pre-designed website templates.",
    header: "https://ucarecdn.com/b0e42bde-36e3-476d-af09-f6b6aa61001c/",
    className: "md:col-span-2",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Designs",
    link: "/designs",
    description: "Discover creative and functional design solutions.",
    header: "https://ucarecdn.com/e88c164e-e33c-48b9-bbb5-301ff085b017/",
    className: "md:col-span-1",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Snippets",
    link: "/snippets",
    description: "Find useful code snippets for various functionalities.",
    header: "https://ucarecdn.com/d13502f5-bd25-43d1-b22c-945ba7dab723/",
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Fullstack Projects",
    link: "/projects",
    description: "Get inspired by complete fullstack project examples.",
    header: "https://ucarecdn.com/ba8036d6-a535-4af0-93b8-ba3b392efc45/",
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
];
