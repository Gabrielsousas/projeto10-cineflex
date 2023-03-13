import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ListContainer from "./ListContainer";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const promise = axios.get(
      "https://mock-api.driven.com.br/api/v8/cineflex/movies"
    );
    promise.then((response) => {
      setMovies(response.data);
    });
    promise.catch((error) => {});
  }, []);

  return (
    <PageContainer>
      Selecione o filme
      <ListContainer movies={movies}></ListContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-top: 70px;
`;

