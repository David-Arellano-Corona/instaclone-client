import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { getToken } from '../utils/token';

let httpLink = createUploadLink({
    uri:"https://david-instaclone-server.herokuapp.com/"
})
const authLink = setContext( (_, { headers })=> {
    const token = getToken();
    return {
        headers:{
            ...headers,
            Authorization: token ? `Bearer ${token}`:"",
        }
    }
} )

let client = new ApolloClient({
    connectToDevTools:true,
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
})

export default client;