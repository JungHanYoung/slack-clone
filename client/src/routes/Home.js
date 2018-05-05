import React from 'react';
import { graphql } from "react-apollo";

// GraphQL
import { allUsersQuery } from "../graphql/user";

const Home = ({data: { allUsers = [] }}) => allUsers.map(u => 
    <h1 key={u.id}>{u.email}</h1>
);

export default graphql(allUsersQuery)(Home);