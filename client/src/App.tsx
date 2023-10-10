import { useState } from "react";
import "./App.css";
import { Router, Routes, Route, Link } from "react-router-dom";
import SignInSide from "./Pages/SignInSide";
import MyTeam from "./Pages/MyTeam";
import Rules from "./Pages/Rules";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { ErrorLink, onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http:://localhost:6969/graphql" }),
]);

// const client = new ApolloClient({
//   cache: InMemoryCache(),
//   link: link,
// });

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<SignInSide />} />
        <Route path="/myteam" element={<MyTeam />} />
        <Route path="/rules" element={<Rules />} />
      </Routes>
    </>
  );
}

export default App;
