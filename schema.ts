import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, password } from "@keystone-6/core/fields";
import { graphql } from "@keystone-6/core";

export const lists = {
  User: list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({ validation: { isRequired: true }, isIndexed: "unique" }),
      password: password({ validation: { isRequired: true } }),
    },
  }),
};

export const extendGraphqlSchema = graphql.extend((base) => {
  return {
    query: {
      hello: graphql.field({
        type: graphql.String,
        resolve: () => "Hello, Keystone!",
      }),
    },
  };
});
