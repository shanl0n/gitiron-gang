import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';

const GET_PLAYERS = gql`
  query {
    players {
      name
      position
    }
  }
`;

interface Player {
  name: string;
  position: string;
}

function MyComponent() {
  const { loading, error, data } = useQuery<{ players: Player[] }>(GET_PLAYERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data?.players.map((player) => (
        <div key={player.name}>
          <p>Name: {player.name}</p>
          <p>Position: {player.position}</p>
        </div>
      ))}
    </div>
  );
}

export default MyComponent;
