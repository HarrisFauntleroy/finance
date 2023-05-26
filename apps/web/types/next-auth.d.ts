import type { User } from "@alchemical-finance/database/generated/prisma-client";

declare module "next-auth" {
  type Session = {
    userId: string;
    user: User;
  };
}

declare module "next-auth/jwt" {
  type JWT = {
    /** OpenID ID Token */
    idToken?: string;
  };
}
