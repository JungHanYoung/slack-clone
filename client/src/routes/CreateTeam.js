import React, { Component } from 'react';
import { Container, Header, Input, Button, Form, Message } from "semantic-ui-react";
import { graphql } from "react-apollo";

// GraphQL
import { createTeamMutation } from "../graphql/team";

class CreateTeam extends Component {
    state = {
        name: '',
        errors: {},
    }
    onSubmit = async () => {
        this.setState({
            emailError: '',
            passwordError: ''
        });
        const { name } = this.state;
        let response = null;
        try {
            response = await this.props.mutate({ variables: { name }});
        } catch(err) {
            this.props.history.push('/login');
            return;
        }

        console.log(response);

        const { ok, errors, team } = response.data.createTeam;

        if(ok) {
            this.props.history.push(`/viewTeam/${team.id}`);
        } else {
            const err = {};
            errors.forEach(({ path, message }) => {
                err[`${path}Error`] = message;
            });
            this.setState({
                ...this.state,
                errors: err
            });
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
            name,
            errors: { nameError }
        } = this.state;
        const errorList = [];
        if(nameError) {
            errorList.push(nameError);
        }
        return (
            <Container text>
                <Header as='h2'>Create Team</Header>
                <Form>
                    <Form.Field error={!!nameError}>
                    <Input 
                        fluid 
                        placeholder='Name' 
                        name="name" 
                        value={name} 
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

export default graphql(createTeamMutation)(CreateTeam);
