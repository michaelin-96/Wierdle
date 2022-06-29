import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { AllSpeedle } from "./Speedle.jsx";

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
  let { endGame } = useContext(AllSpeedle);

  return (
    <>
      {endGame.correct === 5 ? (
        <EndGameBodyWin>
          You Win! <br></br>
        </EndGameBodyWin>
      ) : (
        <EndGameBodyL>
          You Lose! <br></br>
        </EndGameBodyL>
      )}
    </>
  );
}
