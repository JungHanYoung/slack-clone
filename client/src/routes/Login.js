import React, { Component } from 'react';
import { Container, Header, Input, Button, Form, Message } from "semantic-ui-react";
import { graphql } from "react-apollo";
import gql from 'graphql-tag';

class Login extends Component {
    state = {
        email: '',
        emailError: '',
        password: '',
        passwordError: '',
    }
    onSubmit = async () => {
        this.setState({
            emailError: '',
            passwordError: ''
        });
        const { email, password } = this.state;
        const response = await this.props.mutate({ variables: { email, password }});
        console.log(response);
        const { ok, token, refreshToken, errors } = response.data.login;
        if(ok) {
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
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
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    render() {
        const {
            email,
            password,
            emailError,
            passwordError
        } = this.state;
        const errorList = [];
        if(emailError) {
            errorList.push(emailError);
        }
        if(passwordError) {
            errorList.push(passwordError);
        }
        return (
            <Container text>
                <Header as='h2'>Login</Header>
                <Form>
                    <Form.Field error={!!emailError}>
                    <Input 
                        fluid 
                        placeholder='Email' 
                        name="email" 
                        value={email} 
                        onChange={this.inputChange} 
                        />
                    </Form.Field>
                    <Form.Field error={!!passwordError}>
                    <Input 
                        type="password"
                        fluid 
                        placeholder='Password' 
                        name="password" 
                        value={password} 
                        onChange={this.inputChange} 
                        />
                    </Form.Field>
                    <Button onClick={this.onSubmit}>Submit</Button>
                </Form>
                {(errorList.length) ? <Message
                    error
                    header='There was some errors with your submission'
                    list={errorList}
                /> : null}
            </Container>
        );
    }
}

const loginMutation = gql`
    mutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            ok
            token
            refreshToken
            errors{
                path
                message
            }
        }
    }
`;

export default graphql(loginMutation)(Login);
