import { useQuery, gql } from '@apollo/client';
import { Suspense } from 'react';

import {
    usePreloadedQuery,
} from 'react-relay/hooks';

import { ErrorBoundary } from '../utils/ErrorBoundary';

import type { companyQuery$data as Company } from '../queries/__generated__/companyQuery.graphql';

import useLazyLoadQuery from 'react-relay/lib/relay-hooks/useLazyLoadQuery';
import RelayEnvironmentProvider from 'react-relay/lib/relay-hooks/RelayEnvironmentProvider';
import { MockServer } from '../utils/RelayEnvironment';
import companyQuery from '../queries/companyQuery';

export default function GraphQlData({ refQuery }) {
    return (
        <>
            <Suspense fallback="Loading RelayClientGraphQL....">
                <p>RelayClientGraphQL</p>
                <ErrorBoundary>
                    <RelayClientGraphQL refQuery={refQuery} />
                </ErrorBoundary>
            </Suspense>
            <Suspense fallback="Loading RelayClientLazyLoadQuery....">
                <p>RelayClientLazyLoadQuery</p>
                <RelayEnvironmentProvider environment={MockServer}>
                    <ErrorBoundary>
                        <RelayClientLazyLoadQuery />
                    </ErrorBoundary>
                </RelayEnvironmentProvider>
            </Suspense>
            <Suspense fallback="Loading ApolloClientGraphQL....">
                <p>ApolloClientGraphQL</p>
                <ApolloClientGraphQL />
            </Suspense>
        </>
    );
}

function RelayClientGraphQL({ refQuery }) {

    const response = usePreloadedQuery(companyQuery, refQuery);

    return (
        <ShowGraphQLData companyById={response} />
    )
}

function RelayClientLazyLoadQuery() {

    const data = useLazyLoadQuery<Company>(companyQuery, {
        "id": "52cdef7c4bab8bd675297d8a"
    }, {});

    return (
        <ShowGraphQLData companyById={data} />
    )
}


function ApolloClientGraphQL() {

    const companyQuery = gql`
       query companyQueryUsingApolloClient($id: ID) {
            companyById(id:$id)
            {
                name
                emailAddress
                description
                tweet
                 { 
                    text
                    id
                 }
            }
        }`;


    const { loading, error, data } = useQuery(
        companyQuery,
        {
            variables: { "id": "52cdef7c4bab8bd675297d8a" }
        }
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error ${JSON.stringify(error)}</p>;

    return (
        <ShowGraphQLData companyById={data} />
    );
}

function ShowGraphQLData(response: any) {

    const res = response.companyById?.description;
    //console.log('des' + JSON.stringify(response));
    return (
        <>
            <code><pre>{JSON.stringify(response.companyById, null, 2)}</pre></code>
        </>);
}