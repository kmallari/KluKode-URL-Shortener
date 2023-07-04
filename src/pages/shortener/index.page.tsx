import React from "react";
import { ArrowLeftSquare } from "lucide-react";
import Head from "next/head";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { LinkList } from "@/modules/shortener/LinkList";
import { NewLinkButton } from "@/modules/shortener/NewLinkButton";
import { api } from "@/utils/api";

const Shortener = ({}) => {
  const { data: links } = api.link.getUserLinks.useQuery();
  const linkList = links?.details.links;
  return (
    <>
      <Head>
        <title>KluKode URL Shortener</title>
        <meta name="description" content="KluKode URL Shortener" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative h-screen py-24">
        <div className="container">
          <Button
            variant="ghost"
            className="mb-4 hover:bg-red-500 hover:text-white"
            onClick={async () => await signOut()}
          >
            <ArrowLeftSquare className="mr-2 h-4 w-4" />
            Sign out
          </Button>
          <LinkList links={linkList} />
        </div>
        <NewLinkButton />
      </main>
    </>
  );
};

export default Shortener;
