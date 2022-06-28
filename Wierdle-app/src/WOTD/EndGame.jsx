import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { AllWordle } from "../App.jsx";
import { AllWOTD } from "./WOTD.jsx";

const EndGameBodyWin = styled.h5`
  margin-top: 5px;
  margin-bottom: 5px;
  color: #538d4e;
  background-color: #fafafa;
  border-radius: 5px;
`;

const EndGameBodyL = styled.h5`
  margin-top: 5px;
  margin-bottom: 5px;
  color: #f07171;
`;

export default function EndGame() {
  let { wordOTD } = useContext(AllWordle);
  let { endGame, currentIdx } = useContext(AllWOTD);
  return (
    <>
      {endGame.correct ? (
        <EndGameBodyWin>
          You Win! <br></br> It took you {currentIdx.row} turn(s)!{" "}
        </EndGameBodyWin>
      ) : (
        <EndGameBodyL>
          You Lose! <br></br> The Correct Word Was: {wordOTD}{" "}
        </EndGameBodyL>
      )}
    </>
  );
}
