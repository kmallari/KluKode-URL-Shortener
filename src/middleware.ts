import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log("LOGGING...", req.nextauth);
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log({ token });
        if (token) return true;
        return false;
      },
    },
  }
);

export const config = { matcher: ["/shortener"] };
