import graphql from 'babel-plugin-relay/macro';

const companyQuery = graphql`
    query companyQuery($id: ID) {
            companyById(id:$id)
            {
                id
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

export default companyQuery;