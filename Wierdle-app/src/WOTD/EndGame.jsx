import React, {useState, useContext, useEffect} from 'react';
import styled from 'styled-components';
import {AllWordle} from '../App.jsx';

const EndGameBodyWin = styled.h5`
  margin-top: 5px;
  margin-bottom: 5px;
  color: #538d4e;
`

const EndGameBodyL = styled.h5`
  margin-top: 5px;
  margin-bottom: 5px;
  color: #f07171;
`

export default function EndGame () {

  let {endGame, wordOTD, currentIdx} = useContext(AllWordle);

  return (
    <>
    <br></br>
      {endGame.correct ? <EndGameBodyWin>You Win! <br></br> It took you {currentIdx.row} turn(s)! </EndGameBodyWin> : <EndGameBodyL>You Lose! <br></br> The Correct Word Was: {wordOTD} </EndGameBodyL>}
    </>
  );
}