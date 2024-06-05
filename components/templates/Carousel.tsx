import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export function TemplateCarousel() {
  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 cursor-grab rounded-xl">
            <div className="p-1 rounded-xl">
              <Card
                className={`w-full sm:h-[550px] h-[400px] rounded-xl ${
                  index % 2 === 0 ? "bg-gray-300" : "bg-[#312d2d]"
                }`}
              >
                <CardContent className="w-full h-full p-5 overflow-y-auto authmodal">
                  <img src="/screen.png" alt="" className="rounded-md" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
