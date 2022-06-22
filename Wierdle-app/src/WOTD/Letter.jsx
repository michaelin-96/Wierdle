import React, {useState, useContext, useEffect} from 'react';
import styled from 'styled-components';
import {AllWordle} from '../App.jsx';

const LetterContainer = styled.div`
  flex: 33%;
  height: 100%;
  border: 1px solid grey;
  margin: 5px;
  display: grid;
  place-items: center;
  font-size: 30px;
  font-weight: bolder;
  color: white;
`

export default function Letter ({row, column}) {

  const {board, setBoard} = useContext(AllWordle);

  return (
    <>
      <LetterContainer >{board[row][column]}</LetterContainer>
    </>
  );
};