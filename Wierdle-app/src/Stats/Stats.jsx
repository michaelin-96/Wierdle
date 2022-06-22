import React, {useState, useContext, useEffect} from 'react';
import styled from 'styled-components';

import {AllWordle} from '../App.jsx';

const BackIcon = styled.div`
  font-size: 2em;
  cursor: pointer;
  &:hover {
    color: #56e8e6;
  }
  position: absolute;
  bottom: 20px;
  left: 20px;
`


export default function Stats () {

  const {page, setPage} = useContext(AllWordle);

  return (
    <>
      <div>Statistics</div>
      <BackIcon onClick={() => setPage('homepage')}>{'< Go Back'}</BackIcon>
    </>
  );
}