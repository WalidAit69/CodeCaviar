import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface Props {
  title: string;
  description?: string;
  content?: string;
  footer: string;
}

function DashboardCard({ title, description, content, footer }: Props) {
  return (
    <Link href={`/admin/${title.toLowerCase()}`}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{content}</p>
        </CardContent>
        <CardFooter>
          <p>{footer}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default DashboardCard;
