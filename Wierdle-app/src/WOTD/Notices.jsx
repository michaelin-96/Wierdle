import React, {useState, useContext, useEffect} from 'react';
import styled from 'styled-components';
import {AllWordle} from '../App.jsx';

const NoticeBody = styled.h5`
  margin-top: 5px;
  margin-bottom: 5px;
  color: #f07171;
  background-color: #fafafa;
  border-radius: 5px;
`

export default function Notices () {
  const {validWord, repeatWord} = useContext(AllWordle);

  return (
    <>
      <br></br>
      {validWord ? <></> : <NoticeBody>Not A Valid Word</NoticeBody>}
      {repeatWord ? <NoticeBody>Word Already Used</NoticeBody> : <></>}
    </>
  );
}