import React,{ useEffect, useState } from 'react'
import { useQuery } from '@apollo/client';
import { size } from 'lodash';
import { GET_FOLLOWERS, GET_FOLLOWEDS } from '../../../../gql/follow';
import ModalBasic from '../../../Modal/ModalBasic';
import ListUsers from '../../ListUsers';
import './Followers.scss'
export default function Followers(props) {
    const { username,totalPublications } = props;
    const [showModal, setShowModal] = useState(false);
    const [titleModal, seTitleModal] = useState("");
    const [childrenModal, setChildrenModal] = useState(null);

    const { data: dataFollowers, loading: loadingFollowers ,
        startPolling: startPollingFollowers,
        stopPolling: stopPollingFollowers
    } = useQuery(GET_FOLLOWERS,{
        variables:{
            username
        }
    });


    const { data: dataFolloweds, 
        loading:loadingFolloweds, 
        startPolling: startPollingFolloweds, 
        stopPolling: stopPollingFolloweds } = useQuery(GET_FOLLOWEDS,{
        variables:{username}
    })
    useEffect(() => {
        startPollingFollowers(1000)
        return () => {
            stopPollingFollowers()
        }
    }, [stopPollingFollowers, stopPollingFollowers])

    useEffect(() => {
        startPollingFolloweds(1000);
        return () => {
            stopPollingFolloweds();
        }
    }, [startPollingFolloweds, stopPollingFolloweds])


    const openFollowers = () => {
        seTitleModal("Seguidores")
        setChildrenModal(<ListUsers 
            users={getFollowers} setShowModal={setShowModal} />)
        setShowModal(true)
    }

    const openFolloweds = () => {
        seTitleModal("Usuarios seguidos");
        setChildrenModal(
            <ListUsers users={getFolloweds} setShowModal={setShowModal} />
        )
        setShowModal(true);
    }

    if(loadingFollowers  || loadingFolloweds ) return null
    const { getFollowers } = dataFollowers;
    const { getFolloweds } = dataFolloweds;

    return (
        <>
        <div className="followers" >
            <p>
                <span>{totalPublications}</span> publicaciones
            </p>
            <p className="link" onClick={openFollowers} > <span>{size(getFollowers)}</span> seguidores </p>
            <p className="link" onClick={openFolloweds}  > <span>
                {size(getFolloweds)}
                </span> seguidos </p>
        </div>
        <ModalBasic show={showModal} setShow={setShowModal} title={titleModal} >
            {childrenModal}
        </ModalBasic>
        </>
    )
}
