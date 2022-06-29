import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { AllSpeedle } from "./Speedle.jsx";
import "../index.css";

const LetterContainer = styled.div`
  flex: 33%;
  height: 100%;
  border: 2px groove #474747;
  margin: 5px;
  display: grid;
  place-items: center;
  font-size: 30px;
  font-weight: bolder;
  color: white;
`;

export default function Letter({ row, column }) {
  const { board, speedleBank, currentIdx } = useContext(AllSpeedle);

  const currentLetter = board[row][column];
  const correctLetter =
    speedleBank[currentIdx.try][column] === currentLetter || false;
  const containsLetter =
    !correctLetter &&
    currentLetter !== "" &&
    speedleBank[currentIdx.try].includes(currentLetter);

  const letterID =
    currentIdx.row > row &&
    (correctLetter ? "green" : containsLetter ? "yellow" : "incorrect");

  return (
    <>
      <LetterContainer id={letterID ? letterID : ""}>
        {board[row][column]}
      </LetterContainer>
    </>
  );
}
// id={letterID ? letterID : ""}
