import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { AllWordle } from "../App.jsx";

import Board from "../components/Board.jsx";
import Keyboard from "../components/Keyboard.jsx";
import EndGame from "../components/EndGame.jsx";
import Notices from "../components/Notices.jsx";

const Header = styled.h2`
  font-size: 2em;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const BackIcon = styled.div`
  font-size: 1.5em;
  cursor: pointer;
  &:hover {
    color: #3a3a3c;
    font-weight: 700;
  }
  position: absolute;
  top: 20px;
  left: 20px;
`;

export default function WOTD() {
  const { setPage, endGame } = useContext(AllWordle);

  return (
    <>
      <Header>
        Wierd(le) of the Day
        <Notices />
        {endGame.attemptsLeft ? <></> : <EndGame />}
      </Header>
      <Board />
      <Keyboard />
      <BackIcon onClick={() => setPage("homepage")}>{"< Go Back"}</BackIcon>
    </>
  );
}
