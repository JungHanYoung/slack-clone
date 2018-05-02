import React, { Component } from 'react';
import { Container, Header, Input, Button } from "semantic-ui-react";

class Login extends Component {
    state = {
        email: '',
        password: ''
    }
    onSubmit = () => {
        console.log(this.state);
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
            password
        } = this.state;
        return (
            <Container text>
                <Header as='h2'>Login</Header>
                <Input 
                    fluid 
                    placeholder='Email' 
                    name="email" 
                    value={email} 
                    onChange={this.inputChange} 
                    />
                <Input 
                    type="password"
                    fluid 
                    placeholder='Password' 
                    name="password" 
                    value={password} 
                    onChange={this.inputChange} 
                    />
                <Button onClick={this.onSubmit}>Submit</Button>
            </Container>
        );
    }
}

export default Login;
