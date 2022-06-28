import React, {useState, useContext, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import KeyboardLetter from './KeyboardLetter.jsx';
import {AllWordle} from '../App.jsx';
import { FaBackspace } from "react-icons/fa";


const KeyboardContainer = styled.div`
  width: 700px;
  height: 225px;
  margin-top: 20px;
`
const KeyboardRow = styled.div`
  display: flex;
  flex-direction: row;
  flex: 33%;
  justify-content: center;
  margin: 5px;
`

const EnterCont = styled.div`
  width: 100px;
  height: 70px;
  margin: 5px;
  border-radius: 4px;
  display: grid;
  place-items: center;
  font-size: 20px;
  background-color: grey;
  color: white;
  cursor: pointer;
  &:hover{
    font-weight: bolder;
    background-color: #4a4848;
  }
`
const BackspaceCont = styled.div`
  width: 100px;
  height: 70px;
  margin: 5px;
  border-radius: 4px;
  display: grid;
  place-items: center;
  font-size: 20px;
  background-color: grey;
  color: white;
  cursor: pointer;
  &:hover{
    font-weight: bolder;
    background-color: #4a4848;
  }
`

export default function Keyboard () {

  const row1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const row2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  const row3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];
  const alphabet = [...row1, ...row2, ...row3];

  let {handleEnter, handleBackspace, handleLetterSelect, endGame} = useContext(AllWordle);

  const handleKeyboardInput = useCallback((e) => {
    if (endGame.attemptsLeft) {
      if (e.key === 'Enter') {
        handleEnter();
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (alphabet.indexOf(e.key.toUpperCase()) !== -1) {
        handleLetterSelect(e.key.toUpperCase());
      }
    }
  })

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboardInput)
    return () => {
      document.removeEventListener("keydown", handleKeyboardInput)
    }
  }, [handleKeyboardInput])


  return (
    <>
      <KeyboardContainer onKeyDown={() => handleKeyboardInput()}>
        <KeyboardRow>
          {row1.map((elem, idx) => {
            return <KeyboardLetter key={idx} letter={elem}/>
          })}
        </KeyboardRow>
        <KeyboardRow>
          {row2.map((elem, idx) => {
            return <KeyboardLetter key={idx} letter={elem} />
          })}
        </KeyboardRow>
        <KeyboardRow>
          <EnterCont onClick={() => handleEnter()}>Enter</EnterCont>
          {row3.map((elem, idx) => {
            return <KeyboardLetter key={idx} letter={elem} />
          })}
          <BackspaceCont onClick={() => handleBackspace()}>
            <FaBackspace />
          </BackspaceCont>
        </KeyboardRow>
      </KeyboardContainer>
    </>
  );
}