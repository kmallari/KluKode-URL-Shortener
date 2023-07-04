import React, { type FC } from "react";
import { type Link } from "@prisma/client";
import { ArrowUpRight, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { env } from "@/env.mjs";
import { api } from "@/utils/api";

type LinksListProps = {
  links: Link[] | undefined;
};

export const LinkList: FC<LinksListProps> = ({ links }) => {
  const { refetch } = api.link.getUserLinks.useQuery();
  const { toast } = useToast();
  const deleteLink = api.link.deleteLink.useMutation({
    onSuccess: async () => {
      await refetch();
      toast({
        title: "Link deleted",
        description: "Your link has been deleted.",
        variant: "destructive",
      });
    },
  });

  const selfUrl = env.NEXT_PUBLIC_URL;

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Your Links</CardTitle>
        <CardDescription>
          List of your links. Copy, edit, or delete any of them.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {links ? (
          links?.map((link) => (
            <Card key={link.id} className="flex items-center justify-between">
              <CardContent className="p-6">
                <CardTitle>
                  <a
                    href={link.url}
                    target="_blank"
                    className="flex flex-row items-center gap-2 text-sm"
                  >
                    {link.url}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </CardTitle>
              </CardContent>
              <CardFooter className="flex flex-row gap-4 p-6">
                <Button
                  variant="secondary"
                  className="flex flex-row gap-2 font-light text-gray-600"
                  onClick={async () => {
                    await navigator.clipboard.writeText(
                      `${selfUrl}/${link.accessor}`
                    );
                    toast({
                      title: `${selfUrl}/${link.accessor}`,
                      description: "has been copied to your clipboard.",
                      variant: "success",
                    });
                  }}
                >
                  <Copy className="h-4 w-4" />
                  {selfUrl}/{link.accessor}
                </Button>
                <Button variant="outline">Edit</Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    deleteLink.mutate({ id: link.id });
                  }}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p>No links found.</p>
        )}
      </CardContent>
    </Card>
  );
};
