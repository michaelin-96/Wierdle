import React, {useState, useContext, useEffect} from 'react';
import styled from 'styled-components';
import {AllWordle} from '../App.jsx';
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
  &:hover{
    font-weight: bolder;
    background-color: #4a4848;
  }
`

export default function KeyboardLetter ({letter}) {

  let {handleLetterSelect} = useContext(AllWordle);

  return (
    <>
      <KeyLetterCont onClick={() => handleLetterSelect(letter)}>{letter}</KeyLetterCont>
    </>
  );

}