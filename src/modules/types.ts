import * as z from "zod";

export const newLinkFormSchema = z.object({
  url: z.string().url({
    message: "Please enter a valid URL.",
  }),
  shortUrl: z.string().optional(),
});

export type NewLinkForm = z.infer<typeof newLinkFormSchema>;
