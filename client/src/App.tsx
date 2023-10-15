import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import MyTeam from "./Pages/MyTeam";
import Rules from "./Pages/Rules";
import PlayerList from "./Pages/PlayerList";


function App() {
  const [token, setToken] = useState();
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/myteam" element={<MyTeam />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/players" element={<PlayerList />}/>
      </Routes>
    </>
  );
}

export default App;
