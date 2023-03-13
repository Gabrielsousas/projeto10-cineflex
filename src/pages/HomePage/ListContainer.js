import styled from "styled-components";
import { Link } from "react-router-dom";

export default function ListContainer({ movies }) {
  return (
    <StyledListContainer>
      {movies.map((m) => (
        <Link key={m.id} to={`/sessoes/${m.id}`}>
          <MovieContainer data-test="movie" key={m.id}>
            <img src={m.posterURL}></img>
          </MovieContainer>
        </Link>
      ))}
    </StyledListContainer>
  );
}

const StyledListContainer = styled.div`
  width: 330px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 10px;
`;

const MovieContainer = styled.div`
  width: 145px;
  height: 210px;
  box-shadow: 0px 2px 4px 2px #0000001a;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  img {
    width: 130px;
    height: 190px;
  }
`;
