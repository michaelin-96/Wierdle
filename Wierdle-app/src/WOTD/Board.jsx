import React, {useState, useContext, useEffect} from 'react';
import styled from 'styled-components';

import Letter from './Letter.jsx';


const BoardContainer = styled.div`
  width: 450px;
  height: 550px;
  border: 1.5px solid black;
  display: flex;
  flex-direction: column;
  padding-bottom: 12px;
`

const BoardRow = styled.div`
  flex: 33%;
  display: flex;
  flex-direction: row;
  margin: 5px;
`



export default function Board () {


  return (
    <>
      <BoardContainer>
        <BoardRow>
          {[0, 1, 2, 3, 4].map((idx) => {
            return (
              <Letter key={idx} column={idx} row={0}/>
            )
          })}
        </BoardRow>
        <BoardRow>
        {[0, 1, 2, 3, 4].map((idx) => {
            return (
              <Letter key={idx} column={idx} row={1}/>
            )
          })}
        </BoardRow>
        <BoardRow>
          {[0, 1, 2, 3, 4].map((idx) => {
            return (
              <Letter key={idx} column={idx} row={2}/>
            )
          })}
        </BoardRow>
        <BoardRow>
          {[0, 1, 2, 3, 4].map((idx) => {
            return (
              <Letter key={idx} column={idx} row={3}/>
            )
          })}
        </BoardRow>
        <BoardRow>
          {[0, 1, 2, 3, 4].map((idx) => {
            return (
              <Letter key={idx} column={idx} row={4}/>
            )
          })}
        </BoardRow>
        <BoardRow>
          {[0, 1, 2, 3, 4].map((idx) => {
            return (
              <Letter key={idx} column={idx} row={5}/>
            )
          })}
        </BoardRow>
      </BoardContainer>
    </>
  );
};
