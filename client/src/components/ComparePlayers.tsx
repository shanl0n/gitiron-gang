import { Player } from "@types";
import styled from "styled-components";
import PlayerTable from "./PlayerTable";

const Wrapper = styled.div`
  background-color: white;
  color: black;
  display: flex;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;
const TitleContainerLeft = styled.div`
  color: black;
  font-weight: bold;
  margin: auto;
  margin-right: 2rem;
  text-align: right;
`;

const TitleContainerRight = styled.div`
  color: black;
  font-weight: bold;
  margin: auto;
  margin-left: 2rem;
`;

const RightTitle = styled.p`
  color: #8f0000;
  font-size: 184%;
  margin: 0;
`;

const LeftTitle = styled.p`
  color: #004792;
  font-size: 184%;
  display: block;
  margin: 0;
  text-align: right;
`;

const VS = styled.div`
  font-weight: bold;
`;

interface Comparison {
  title: string;
  subtitle?: string;
  players: Player[];
}

interface Props {
  left: Comparison;
  right: Comparison;
}

const ComparePlayers = ({left, right}: Props) => {
  return (
    <>
      <Wrapper>
        <TitleContainerLeft>
          <LeftTitle>{left.title}</LeftTitle>
          {left.subtitle}
          <PlayerTable players={left.players} />
        </TitleContainerLeft>
        <VS>VS</VS>
        <TitleContainerRight>
          <RightTitle>{right.title} </RightTitle>
          {right.subtitle}
          <PlayerTable players={right.players} />
        </TitleContainerRight>
      </Wrapper>
    </>
  );
};

export default ComparePlayers;
