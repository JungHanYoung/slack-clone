import React, { Component } from 'react';
import { Message, Container, Header, Input, Button } from "semantic-ui-react";
import { graphql } from "react-apollo";
import gql from 'graphql-tag';

class Register extends Component {
    state = {
        username: '',
        usernameError: '',
        email: '',
        emailError: '',
        password: '',
        passwordError: '',
    }
    onSubmit = async () => {
        this.setState({
            usernameError: '',
            emailError: '',
            passwordError: ''
        });
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
        const { ok, errors } = response.data.register;
        if(ok) {
            this.props.history.push('/');
        } else {
            const err = {};
            errors.forEach(({ path, message }) => {
                err[`${path}Error`] = message;
            });
            this.setState(err);
        }
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
            password,
            usernameError,
            emailError,
            passwordError
        } = this.state;
        const errorList = [];
        if(usernameError){
            errorList.push(usernameError)
        }
        if(emailError){
            errorList.push(emailError)
        }
        if(passwordError){
            errorList.push(passwordError)
        }
        return (
            <Container text>
                <Header as='h2'>Header</Header>
                <Input error={!!usernameError} fluid placeholder='Username' name="username" value={username} onChange={this.inputChange} />
                <Input error={!!emailError} fluid placeholder='Email' name="email" value={email} onChange={this.inputChange} />
                <Input error={!!passwordError} fluid type="password" placeholder='Password' name="password" value={password} onChange={this.inputChange} />
                <Button onClick={this.onSubmit}>Submit</Button>
                {(usernameError || emailError || passwordError) ? <Message
                    error
                    header='There was some errors with your submission'
                    list={errorList}
                /> : null}
            </Container>
        );
    }
}

const registerMutation = gql`
    mutation($username: String!, $email: String!, $password: String!) {
        register(username: $username, email: $email, password: $password){
            ok
            errors {
                path
                message
            }
        }
    }
`;

export default graphql(registerMutation)(Register);
