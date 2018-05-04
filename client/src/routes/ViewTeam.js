import React from 'react'

import SideBar from '../containers/SideBar';
import Header from '../components/Header';
import Messages from '../components/Messages';
import SendMessage from '../components/SendMessage';
import AppLayout from '../components/AppLayout';

export default ({ match: { params } }) => (
      <AppLayout>
            <SideBar currentTeamId={params.teamId}/>
            <Header
            channelName="general"
            />
            <Messages>
                  <ul>
                        <li></li>
                        <li></li>
                  </ul>
            </Messages>
            <SendMessage 
            channelName="general"
            />
      </AppLayout>
)