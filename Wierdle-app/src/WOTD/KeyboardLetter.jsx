import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { AllWordle } from "../App.jsx";
import "../index.css";

const KeyLetterCont = styled.div`
  width: 50px;
  height: 70px;
  margin: 5px;
  border-radius: 4px;
  display: grid;
  place-items: center;
  font-size: 20px;
  background-color: grey;
  color: white;
  cursor: pointer;
  &:hover {
    font-weight: bolder;
    background-color: #4a4848;
  }
`;

export default function KeyboardLetter({ letter }) {
  let {
    page,
    handleLetterSelect,
    selectedLetters,
    wordOTD,
    selectedLettersP,
    randomWord,
  } = useContext(AllWordle);

  const KeyboardLetterID =
    selectedLetters.indexOf(letter) !== -1 && wordOTD.includes(letter)
      ? "green"
      : selectedLetters.indexOf(letter) !== -1
      ? "incorrect"
      : "";

  const KeyboardLetterIDP =
    selectedLettersP.indexOf(letter) !== -1 && randomWord.includes(letter)
      ? "green"
      : selectedLettersP.indexOf(letter) !== -1
      ? "incorrect"
      : "";

  return (
    <>
      {page === "wotd" ? (
        <KeyLetterCont
          id={KeyboardLetterID}
          onClick={() => handleLetterSelect(letter)}
        >
          {letter}
        </KeyLetterCont>
      ) : (
        <KeyLetterCont
          id={KeyboardLetterIDP}
          onClick={() => handleLetterSelect(letter)}
        >
          {letter}
        </KeyLetterCont>
      )}
    </>
  );
}
