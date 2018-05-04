import React from 'react';
import styled from 'styled-components';
import { Header } from "semantic-ui-react";

const HeaderWrapper =  styled.div`
      grid-column: 3;
      grid-row: 1 / 4;
`;

export default ({channelName}) => (
      <HeaderWrapper>
            <Header as="h1" textAlign="center">#{channelName}</Header>
      </HeaderWrapper>
)