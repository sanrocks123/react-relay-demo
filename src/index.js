import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { RelayEnvironment } from './utils/RelayEnvironment';

import {
  RelayEnvironmentProvider,
} from 'react-relay/hooks';
import App from './App';

const client = new ApolloClient({
  uri: 'http://localhost:1000/trading-bot/graphql',
  cache: new InMemoryCache(),
});

const app1 = ReactDOM.createRoot(document.getElementById('app1'));
app1.render(
  <BrowserRouter>
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </RelayEnvironmentProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
