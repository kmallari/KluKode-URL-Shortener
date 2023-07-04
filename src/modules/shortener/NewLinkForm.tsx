import React, { type FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { newLinkFormSchema } from "@/modules/types";
import { api } from "@/utils/api";

export const NewLinkForm: FC = ({}) => {
  const { refetch } = api.link.getUserLinks.useQuery();
  const { toast } = useToast();
  const createLink = api.link.createUserLink.useMutation({
    onSuccess: async () => {
      await refetch();
      toast({
        title: "Link created",
        description: "Your link has been created.",
        variant: "success",
      });
    },
  });

  const form = useForm<z.infer<typeof newLinkFormSchema>>({
    resolver: zodResolver(newLinkFormSchema),
  });

  const onSubmit = (values: z.infer<typeof newLinkFormSchema>) => {
    createLink.mutate(values);
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Shorten a URL</DialogTitle>
        <DialogDescription>
          Paste a link below to shorten it. You can also optionally customize
          the shortened link.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 py-4"
        >
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">URL</FormLabel>
                <FormControl>
                  <Input className="col-span-3" {...field} />
                </FormControl>
                {/*<div className="col-span-1 h-0" />*/}
                <FormMessage className="col-span-3 col-start-2" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shortUrl"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">Short URL</FormLabel>
                <FormControl>
                  <Input
                    className="col-span-3"
                    placeholder="(Optional)"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <DialogFooter>
            <DialogTrigger>
              <Button type="submit">Create</Button>
            </DialogTrigger>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};
