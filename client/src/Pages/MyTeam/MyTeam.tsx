import React, { useState } from "react";

import { useQuery, gql } from "@apollo/client";

import { FantasyTeam, Player } from "@types";
import Button from "@mui/material/Button";
import PlayerTable from "../../components/PlayerTable";
import DropPlayer from "./DropPlayer";

const Container = styled.div`
  width: 62rem;
  margin-left: auto;
  margin-right: auto;
`;

const GET_FANTASY_TEAM = gql`
  query GetFantasyTeam {
    fantasyTeam {
      name
      players {
        id
        name
        position
        fantasyTeam {
          id
          name
        }
        gameStatsSummary {
          rushing {
            attempts
            touchdowns
            yards
          }
          receiving {
            receptions
            yards
            touchdowns
          }
          passing {
            completions
            yards
            touchdowns
            interceptions
          }
          fumbles {
            fumbles
          }
          totalPoints
        }
      }
    }
  }
`;

interface GetFantasyTeamData {
  fantasyTeam: FantasyTeam;
}

const MyTeam = () => {
  const [dropping, setDropping] = useState(false);
  const { loading, error, data, refetch } =
    useQuery<GetFantasyTeamData>(GET_FANTASY_TEAM);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (!data) return <p>No players found</p>;

  const handlePlayerDropped = () => {
    setDropping(false);
    refetch();
  };

  const renderAction = (player: Player) => {
    return (
      dropping && <DropPlayer onDrop={handlePlayerDropped} player={player} />
    );
  };

  return (
    <>
      <Button href="/players">Add</Button>
      <Button onClick={() => setDropping(true)}>Drop</Button>
      <Button href="/players">Trade</Button>
      <Container>
        <PlayerTable
          players={data.fantasyTeam.players}
          renderAction={renderAction}
        />
      </Container>
    </>
  );
};

export default MyTeam;
