import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
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
import Navbar from "./components/Navbar";
import GameCentre from "./Pages/GameCentre/GameCentre";
import TradeCentre from "./Pages/TradeCentre";

const TOKEN_KEY = "gitiron-gang-token";

const httpLink = createHttpLink({ uri: "http://localhost:4000/graphql" });

function App() {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY));
  
  const handleLogin = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  }

  if (!token) {
    return <Login onLogin={handleLogin} />;
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
      <Navbar onLogout={handleLogout}/>
      <Routes>
        <Route path="/" element={<MyTeam />} />
        <Route path="/myteam" element={<MyTeam />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/players" element={<PlayerList />} />
        <Route path="/gamecentre" element={<GameCentre />} />
        <Route path="/trades" element={<TradeCentre />} />
      </Routes>
    </ApolloProvider>
  );
}

export default App;
