import React, {useState, useContext, useEffect} from 'react';
import styled from 'styled-components';

import {AllWordle} from '../App.jsx';

const Header = styled.h2`
  font-size: 2em;
  margin-top:5px;
  margin-bottom: 10px;
`

const BackIcon = styled.div`
  font-size: 1em;
  cursor: pointer;
  &:hover {
    color: #56e8e6;
    font-weight: bolder;
  }
  position: absolute;
  top: 20px;
  left: 20px;
`


export default function Stats () {

  const {page, setPage} = useContext(AllWordle);

  return (
    <>
      <Header>Statistics</Header>
      <div>In Development</div>
      <BackIcon onClick={() => setPage('homepage')}>{'< Go Back'}</BackIcon>
    </>
  );
}