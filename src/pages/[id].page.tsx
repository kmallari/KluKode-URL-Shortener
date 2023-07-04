import React from "react";
import { type GetServerSidePropsContext } from "next";

import { prisma } from "@/server/db";

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ id: string }>
) => {
  const accessor = context.params?.id || "";
  const link = await prisma.link.findUnique({
    where: {
      accessor,
    },
  });
  if (!link) {
    return {
      notFound: true,
    };
  } else {
    return {
      redirect: {
        destination: link.url,
      },
    };
  }
};

const IdPage = ({}) => {
  return <></>;
};

export default IdPage;
