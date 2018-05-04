import React, { Fragment } from 'react';
import { graphql } from "react-apollo";
import gql from 'graphql-tag';
import _ from 'lodash';
import decode from 'jwt-decode';

import Teams from '../components/Teams';
import Channels from '../components/Channels';
import AddChannelModal from '../components/AddChannelModal';

class SideBar extends React.Component {

    state = {
        openAddChannelModal: false,
    }

    handleAddChannelClose = () => {
        this.setState({ openAddChannelModal: false });
    }

    handleAddChannelClick = () => {
        this.setState({ openAddChannelModal: true });
    }
    render() {
        const { data: { loading, allTeams } , currentTeamId } = this.props;
        if(loading) {
            return null;
        }
        const teamIdx = currentTeamId ? _.findIndex(allTeams, ['id', parseInt(currentTeamId, 10)]) : 0;
        console.log(allTeams);
        console.log(teamIdx);
        console.log(currentTeamId);
        const team = allTeams[teamIdx];
        console.log(team);
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
                onAddChannelClick={this.handleAddChannelClick}
                />
                <AddChannelModal 
                teamId={currentTeamId}
                open={this.state.openAddChannelModal}
                onClose={this.handleAddChannelClose}
                />
            </Fragment>
        )
    }
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
