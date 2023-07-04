import React, { type FC } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { NewLinkForm } from "@/modules/shortener/NewLinkForm";

export const NewLinkButton: FC = ({}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="absolute bottom-8 right-8 flex h-16 w-16 items-center justify-center rounded-full"
        >
          <Plus />
        </Button>
      </DialogTrigger>
      <NewLinkForm />
    </Dialog>
  );
};
