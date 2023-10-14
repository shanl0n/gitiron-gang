import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { MongoClient } from "mongodb";
import { typeDefs } from "./schema/index";
import { resolvers } from "./resolvers/index";
  import { setupDatasource } from "./datasource";
import { ResolverContext } from "./context";

// Replace the uri string with your connection string.
const dbUri = "mongodb://localhost:27017/gitiron_gang";
const dbClient = new MongoClient(dbUri);

const server = new ApolloServer<ResolverContext>({
  typeDefs,
  resolvers,
});

const run = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({req}) => ({
      dataSources: setupDatasource(dbClient),
    }),
  });
  
  console.log(`🚀  Server ready at: ${url}`);
}

run().catch(console.dir);