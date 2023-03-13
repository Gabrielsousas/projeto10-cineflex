import styled from "styled-components";
import HomePage from "./pages/HomePage/HomePage";
import SeatsPage from "./pages/SeatsPage/SeatsPage";
import SessionsPage from "./pages/SessionsPage/SessionsPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export default function App() {
  const [clientName, setClientName] = useState("");
  const [clientCPF, setClientCPF] = useState("");
  const [imgMovie, setImgMovie] = useState([
    "https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif",
  ]);
  const [sessionWeekday, setSessonWeekday] = useState("loading");
  const [sessionTime, setsessionTime] = useState("loading...");
  const [movieName, setMovieName] = useState("");
  const numeroDosAssentos = []

  return (
    <>
      <NavContainer>CINEFLEX</NavContainer>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/assentos/:idSessao"
            element={
              <SeatsPage
                clientName={clientName}
                setClientName={setClientName}
                clientCPF={clientCPF}
                setClientCPF={setClientCPF}
                imgMovie={imgMovie}
                setImgMovie={setImgMovie}
                sessionWeekday={sessionWeekday}
                setSessonWeekday={setSessonWeekday}
                sessionTime={sessionTime}
                setsessionTime={setsessionTime}
                movieName={movieName}
                setMovieName={setMovieName}
                numeroDosAssentos={numeroDosAssentos}
              />
            }
          />
          <Route path="/sessoes/:idFilme" element={<SessionsPage />} />
          <Route
            path="/sucesso"
            element={
              <SuccessPage clientName={clientName} clientCPF={clientCPF} movieName={movieName} sessionTime={sessionTime} sessionWeekday={sessionWeekday} numeroDosAssentos={numeroDosAssentos}/>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

const NavContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #c3cfd9;
  color: #e8833a;
  font-family: "Roboto", sans-serif;
  font-size: 34px;
  position: fixed;
  top: 0;
  a {
    text-decoration: none;
    color: #e8833a;
  }
`;
