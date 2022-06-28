import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { AllWordle } from "../App.jsx";
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
  const { page } = useContext(AllWordle);
  const { board, wordOTD, currentIdx } = useContext(AllWordle);
  const { boardP, randomWord, currentIdxP } = useContext(AllWordle);
  if (page === "wotd") {
    const currentLetter = board[row][column];
    const correctLetter = wordOTD[column] === currentLetter;
    const containsLetter =
      !correctLetter && currentLetter !== "" && wordOTD.includes(currentLetter);

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
  } else {
    const currentLetter = boardP[row][column];
    const correctLetter = randomWord[column] === currentLetter;
    const containsLetter =
      !correctLetter &&
      currentLetter !== "" &&
      randomWord.includes(currentLetter);

    const letterID =
      currentIdxP.row > row &&
      (correctLetter ? "green" : containsLetter ? "yellow" : "incorrect");
    return (
      <>
        <LetterContainer id={letterID ? letterID : ""}>
          {boardP[row][column]}
        </LetterContainer>
      </>
    );
  }
}
