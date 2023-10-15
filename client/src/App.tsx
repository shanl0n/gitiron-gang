import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login, { TOKEN_KEY } from "./Pages/Login";
import MyTeam from "./Pages/MyTeam";
import Rules from "./Pages/Rules";
import PlayerList from "./Pages/PlayerList";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({ uri: "http://localhost:4000/graphql" });

function App() {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    return <Login />;
  }
  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  }));
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route path="/" element={<MyTeam />} />
        <Route path="/myteam" element={<MyTeam />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/players" element={<PlayerList />} />
      </Routes>
    </ApolloProvider>
  );
}

export default App;
