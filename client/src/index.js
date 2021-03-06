import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider } from 'react-apollo';

import Routes from './routes';

import client from './apollo';

const App = () => (
    <ApolloProvider client={client}>
        <Routes />
    </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
