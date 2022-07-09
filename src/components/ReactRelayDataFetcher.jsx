import { Suspense, useEffect } from "react";
import { useState } from "react";

const serverBaseURL = "http://localhost:1000";
export function ReactRelayDataFetcher() {

    const [company, setCompany] = useState({});
    const companyQuery = '{companyById(id:"52cdef7c4bab8bd675297d8a"){ name, emailAddress, description, tweet { text, id }}}';

    useEffect(() => {
        (async () => {
            const response = await fetch(`${serverBaseURL}/graphql`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    query: companyQuery,
                    variables: {}
                }),
            });
            const data = await response.json();
            console.log('data received : ' + JSON.stringify(data));

            setCompany(data);

            return (() => {
                console.log('unmounting...')
            });
        })();

    }, []);
    return (
        <div id="reactRelayDataFetcher">
            <Suspense fallback={<p>Loading...</p>}>
                <p>default home component fetching data with GraphQL</p>
                <code><pre>{JSON.stringify(company, null, 2)}</pre></code>
            </Suspense>
        </div>
    );
}