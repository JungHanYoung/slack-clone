import React from 'react';
import { Modal, Button, Input, Form } from "semantic-ui-react";
import { withFormik } from "formik";
import { compose, graphql } from "react-apollo";
import { findIndex } from "lodash";

// GraphQL
import { createChannelMutation } from "../graphql/channel";
import { allTeamsQuery } from "../graphql/team";

const AddChannelModal = ({ 
    open,
    onClose,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
 }) => (
    <Modal open={open} onClose={onClose}>
        <Modal.Header>Add Channel</Modal.Header>
        <Modal.Content>
            <Form>
                <Form.Field>
                    <Input value={values.name} onChange={handleChange} onBlur={handleBlur} name="name" fluid placeholder='Channel name' />
                </Form.Field>
                <Form.Group>
                    <Button disabled={isSubmitting} fluid onClick={onClose}>
                        Cancel
                    </Button>
                    <Button disabled={isSubmitting} fluid onClick={handleSubmit}>
                        Create Channel
                    </Button>
                </Form.Group>
            </Form>
        </Modal.Content>
    </Modal>
);

export default compose(
    graphql(createChannelMutation),
    withFormik({
        mapPropsToValues: () => ({ name: ''}),
        handleSubmit: async (values, { props: { onClose, teamId, mutate}, setSubmitting }) => {
            await mutate({
                variables: {teamId, name: values.name},
                optimisticResponse: {
                    createChannel: {
                        __typename: 'Mutation',
                        ok: true,
                        channel: {
                            __typename: 'Channel',
                            id: -1,
                            name: values.name,
                        },
                    },
                },
                update: (store, { data: { createChannel } }) => {
                    const { ok, channel } = createChannel;
                    if(!ok) {
                        return;
                    }
                    const data = store.readQuery({ query: allTeamsQuery });
                    console.log('data:', data);
                    const teamIdx = findIndex(data.allTeams, ['id', parseInt(teamId, 10)]);
                    console.log(teamIdx);
                    data.allTeams[teamIdx].channels.push(channel);
                    store.writeQuery({ query: allTeamsQuery, data });
                },
            });
            onClose();
            setSubmitting(false);
        },
    })
)(AddChannelModal);