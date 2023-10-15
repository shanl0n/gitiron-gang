import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";
import { typeDefs } from "./schema/index";
import { resolvers } from "./resolvers/index";
import { setupDatasource } from "./datasource";
import { ResolverContext } from "./context";
import express from "express";
import { Auth } from "./auth";

// Replace the uri string with your connection string.
const dbUri = "mongodb://localhost:27017/gitiron_gang";

export const buildApp = async () => {
  const dbClient = new MongoClient(dbUri);
  const dataSources = setupDatasource(dbClient);

  const auth = Auth(dataSources);

  const app = express();

  const gqlServer = new ApolloServer<ResolverContext>({
    typeDefs,
    resolvers,
  });

  await gqlServer.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(gqlServer, {
      context: async ({ req }) => ({
        dataSources,
      }),
    })
  );

  app.use(
    "/login",
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    auth.login,
  );

  return app;
};
