import React, { Component } from 'react';
import { Container, Header, Input, Button } from "semantic-ui-react";
import { graphql } from "react-apollo";
import gql from 'graphql-tag';

class Register extends Component {
    state = {
        username: '',
        email: '',
        password: '',
    }
    onSubmit = async () => {
        const registerFunc = this.props.mutate;
        const {
            username,
            email,
            password
        } = this.state;
        const response = await registerFunc({ variables: {
            username,
            email,
            password
        }});
        console.log(response.data.register);
    }
    inputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render() {
        const {
            username,
            email,
            password
        } = this.state;
        return (
            <Container text>
                <Header as='h2'>Header</Header>
                <Input fluid placeholder='Username' name="username" value={username} onChange={this.inputChange} />
                <Input fluid placeholder='Email' name="email" value={email} onChange={this.inputChange} />
                <Input fluid type="password" placeholder='Password' name="password" value={password} onChange={this.inputChange} />
                <Button onClick={this.onSubmit}>Submit</Button>
            </Container>
        );
    }
}

const registerMutation = gql`
    mutation($username: String!, $email: String!, $password: String!) {
        register(username: $username, email: $email, password: $password)
    }
`;

export default graphql(registerMutation)(Register);
