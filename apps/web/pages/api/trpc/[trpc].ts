import { createContext } from "../../../server/trpc/context";
import { appRouter } from "../../../server/trpc/router/_app";

import { env as environment } from "../../../env/server.mjs";

import { createNextApiHandler } from "@trpc/server/adapters/next";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
  onError:
    environment.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(`❌ tRPC failed on ${path}: ${error}`);
        }
      : undefined,
});
