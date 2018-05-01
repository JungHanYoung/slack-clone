import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import Routes from './routes';

const client = new ApolloClient({
    uri: 'http://localhost:8080'
});

const App = () => (
    <ApolloProvider client={client}>
        <Routes />
    </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();