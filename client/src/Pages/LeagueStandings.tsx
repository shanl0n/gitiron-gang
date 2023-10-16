import React from 'react';

type User = {
  name: string;
  wins: number;
  losses: number;
}

const users: User[] = [
  { name: 'Alice', wins: 3, losses: 1 },
  { name: 'Bob', wins: 2, losses: 2 },
  { name: 'Charlie', wins: 1, losses: 3 },
];

const LeagueStandings: React.FC = () => {
  // Sort users by wins (descending)
  const sortedUsers = [...users].sort((a, b) => b.wins - a.wins);

  return (
    <div>
      <h1>League Standings</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>W-L-D</th>
            <th>PF</th>
            <th>PA</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, index) => (
            <tr key={user.name}>
              <td>{index + 1}. {user.name}</td>
              <td>{user.wins}</td>
              <td>{user.losses}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeagueStandings;
