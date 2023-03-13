import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";

export default function SessionsPage({ movieName, sessionTime, sessionWeekday, setHorario, setDivisor, setMovieName}) {
  const params = useParams();
  const idFilme = params.idFilme;
  const [date, setDate] = useState([]);
  const [dias, setDias] = useState([]);
  const [imgMovie, setImgMovie] = useState("");
  const handleButtonClick = (name) => {
    setHorario(name);
    setDivisor("-");
  };


  useEffect(() => {
    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`
    );
    promise.then((response) => {
      setDate(response.data);
      setDias(response.data.days);
      setImgMovie(response.data.posterURL);
      setMovieName(response.data.title);
    });
  }, [idFilme]);

  return (
    <PageContainer>
      Selecione o horário
      <div>
        {/* Aqui adicionamos um map que está renderizando as datas das sessões */}
        {dias.map((m) => (
          <SessionContainer data-test="movie-day" key={m.id}>
            {m.weekday} - {m.date}
            <ButtonsContainer>
              {/* Aqui iniciamos um segundo map que irá renderizar os botões com os  horários de exibição dos filmes */}
              {m.showtimes.map((n) => (
                <Link key={n.id} to={`/assentos/${n.id}`}>
                  <button onClick={() => handleButtonClick(n.name)} data-test="showtime">{n.name}</button>
                </Link>
              ))}
            </ButtonsContainer>
          </SessionContainer>
        ))}
      </div>
      <Footer
        imgMovie={imgMovie}
        movieName={movieName}
        sessionWeekday={sessionWeekday}
        sessionTime={sessionTime}
      />
    </PageContainer>
  );
}


const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-bottom: 120px;
  padding-top: 70px;
  div {
    margin-top: 20px;
  }
`;
const SessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: "Roboto";
  font-size: 20px;
  color: #293845;
  padding: 0 20px;
`;
const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0;
  button {
    margin-right: 20px;
  }
  a {
    text-decoration: none;
  }
`;
