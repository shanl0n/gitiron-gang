import React from 'react';

const LogoutButton = () => {
  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  return (
    <button onClick={logout}>Logout</button>
  );
};

export default LogoutButton;