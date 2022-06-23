import React, {useState, useContext, useEffect} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {FaTimes} from 'react-icons/fa';


const ModalStyles = styled.div`
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #5a6375;
  padding: 25px;
  zIndex: 1000;
`
const OverlayStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  zIndex: 1000;
`
const Icon = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  color: white;
  cursor: pointer;
  &:hover {
    color: grey;
  }
`

const HowToBody = styled.div`
  color: #fafafa;

`

export default function HowToModal ({open, onClose}) {

  if (!open) return null

  return ReactDOM.createPortal(
    <>
      <OverlayStyles>
        <ModalStyles>
        <Icon>
          <FaTimes onClick={onClose}/>
        </Icon>
        <HowToBody>
          <h2>How to Play</h2>
          <h4>Word of The Day (Original Wordle):</h4>
          <p>Guess the WORDLE in six tries.
          <br/><br/> Each guess must be a valid five-letter word. Hit the enter button to submit.
          <br/><br/> After each guess, the color of the tiles will change to show how close your guess was to the word. </p>
        </HowToBody>
        </ModalStyles>
      </OverlayStyles>
    </>,
    document.getElementById('portal')
  );


};