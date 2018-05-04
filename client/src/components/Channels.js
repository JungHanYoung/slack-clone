import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

const ChannelWrapper = styled.div`
      grid-column: 2;
      grid-row: 1 / 4;
      background-color: #4e3a4c;
      color: #958993;
`;

const paddingLeft = `padding-left: 10px`;

const TeamNameHeader = styled.h1`
      color: #fff;
      font-size: 20px;
`;

const SideBarList = styled.ul`
      width: 100%;
      list-style: none;
      padding-left: 0px;
`;

const SideBarListHeader = styled.li`${paddingLeft};`;

const SideBarListItem = styled.li`
      padding: 2px;
      ${paddingLeft};
      &:hover {
            background: #3e313c;
      }
`

const PushLeft = styled.div`${paddingLeft};`;

const Green = styled.span`color: #38987d;`;

const Bubble = ({ on = true }) => (on ? <Green>●</Green> : '○')

const Channel = ({id, name}) => (
      <SideBarListItem key={`channel-${id}`}>{`# ${name}`}</SideBarListItem>
)
const User = ({id, name}) => (
      <SideBarListItem key={`user-${id}`}>
            <Bubble /> {name}
      </SideBarListItem>
)


export default ({teamName, username, channels, users, onAddChannelClick }) => (
      <ChannelWrapper>
            <PushLeft>
                  <TeamNameHeader>{teamName}</TeamNameHeader>
                  {username}
            </PushLeft>
            <div>
                  <SideBarList>
                        <SideBarListHeader>Channels <Icon onClick={onAddChannelClick} name="add circle" /></SideBarListHeader>
                        {channels.map(Channel)}
                  </SideBarList>
            </div>
            <div>
                  <SideBarList>
                        <SideBarListHeader>Direct Messages</SideBarListHeader>
                        {users.map(User)}
                  </SideBarList>
            </div>
      </ChannelWrapper>
)