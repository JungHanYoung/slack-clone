import React, { Fragment } from 'react';
import { graphql } from "react-apollo";
import gql from 'graphql-tag';
import _ from 'lodash';
import decode from 'jwt-decode';

import Teams from '../components/Teams';
import Channels from '../components/Channels';

const SideBar = ({ data: { loading, allTeams } , currentTeamId }) => {
    if(loading) {
        return null;
    }
     const teamIdx = _.findIndex(allTeams, ['id', currentTeamId]);
     const team = allTeams[teamIdx];
    let username = '';
    try {
        const token = localStorage.getItem('token');
        const { user } = decode(token);
        username = user.username
    } catch(err) {
        this.props.history.push('/login');
    }
    return (
        <Fragment>
            <Teams 
            teams={allTeams.map(t => {
                return {
                    id: t.id,
                    letter: t.name.charAt(0).toUpperCase(),
                }
            })}
            />,
            <Channels 
            teamName={team.name} 
            username={username}
            channels={team.channels}
            users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user1' }]}
            />
        </Fragment>
    )
}

const allTeamsQuery = gql`
    {
        allTeams {
            id
            name
            channels {
                id
                name
            }
        }
    }
`

export default graphql(allTeamsQuery)(SideBar);
