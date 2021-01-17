import React,{ useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { size } from 'lodash';
import { useQuery } from '@apollo/client';
import { GET_PUBLICATIONS } from '../gql/publication';
import Publications from '../components/Publications';
import Profile from '../components/User/Profile';


export default function User() {
    let { username } = useParams();
    const { data, loading, startPolling, stopPolling } = useQuery(GET_PUBLICATIONS,{
        variables:{username}
    })

    useEffect(() => {
        startPolling(1000);
        return () => {
            stopPolling()
        }
    }, [startPolling, stopPolling])

    if(loading) return null;
    const { getPublications } = data;



    return (
        <>
            <Profile username={username}  totalPublications={size(getPublications)} />
            <Publications getPublications={getPublications} />
        </>
    )
}
