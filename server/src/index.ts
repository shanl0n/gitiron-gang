import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { MongoClient } from "mongodb";
import { typeDefs } from "./schema/index";
import { resolvers } from "./resolvers/index";

// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017/gitiron_gang";
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db("gitiron_gang");
    const users = database.collection("users");
    const players = database.collection("players");
    const teams = database.collection("teams");
    const season_schedule = database.collection("season_schedule");
    const game_stats = database.collection("game_stats");

    const query = { name: "Elijah Wilkinson" };
    const player = await players.findOne(query);
    console.log(player);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
