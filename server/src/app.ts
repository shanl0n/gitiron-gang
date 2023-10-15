import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";
import { typeDefs } from "./schema/index";
import { resolvers } from "./resolvers/index";
import { setupDatasource } from "./datasource";
import { RequestContext } from "./context";
import express from "express";
import { Auth } from "./auth";

// Replace the uri string with your connection string.
const dbUri = "mongodb://localhost:27017/gitiron_gang";

export const buildApp = async () => {
  const dbClient = new MongoClient(dbUri);
  const dataSources = setupDatasource(dbClient);

  const app = express();

    app.use(cors());

  app.use((req, _, next) => {
    req.ctx = {
      dataSources: dataSources,
    };
    next();
  });

  const gqlServer = new ApolloServer<RequestContext>({
    typeDefs,
    resolvers,
  });

  await gqlServer.start();

  app.post(
    "/login",
    bodyParser.json(),
    Auth.login,
  );

  app.use("/graphql", Auth.verify)

  app.use(
    "/graphql",
    bodyParser.json(),
    expressMiddleware(gqlServer, {
      context: async ({ req }) => req.ctx
    })
  );

  return app;
};
