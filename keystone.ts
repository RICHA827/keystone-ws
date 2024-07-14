import { config } from "@keystone-6/core";
import { lists, extendGraphqlSchema } from "./schema";
import { extendHttpServer } from "./websocket";

export default config({
  db: {
    provider: "sqlite",
    url: "file:./keystone.db",
  },
  graphql: {
    extendGraphqlSchema,
  },
  lists,
  server: {
    port: 8000,
    extendHttpServer,
  },
});
