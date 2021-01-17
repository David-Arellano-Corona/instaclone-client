import React,{ useState } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../../gql/user';
import useAuth from '../../../hooks/useAuth';
import UserNotFound from '../../UserNotFound';
import ModalBasic from '../../Modal/ModalBasic';
import AvatarForm from '../AvatarForm';
import HeaderProfile from './HeaderProfile';
import SettingsForm from '../SettingsForm';
import Followers from './Followers';
import ImageNotFound from '../../../assets/png/avatar.png';
import './Profile.scss';

export default function Profile(props) {
    let { username, totalPublications } = props;
    let [ showModal, setShowModal ] = useState(false);
    const [titleModal, settitleModal] = useState('')
    const [childrenModal, setchildrenModal] = useState(null)
    let { auth } = useAuth();
    let { data, loading, error, refetch } = useQuery(GET_USER, {
        variables:{
            username
        }
    })

    if(loading) return null
    if(error) return <UserNotFound/>
    let { getUser } = data;

    let handlerModal = (type) => {
        switch(type){
            case "avatar":
                settitleModal("Cambiar foto de perfil")
                setchildrenModal(<AvatarForm setShowModal={setShowModal} auth={auth} />)
                setShowModal(true)
                break;
            case "settings":
                settitleModal("");
                setchildrenModal(<SettingsForm 
                    setTitleModal={settitleModal}
                    setShowModal={setShowModal}
                    setchildrenModal={setchildrenModal} 
                    getUser={getUser}
                    refetch={refetch}
                    />)
                setShowModal(true)
                break;    
        }
    }

    return (
        <>
            <Grid className="profile" >
                <Grid.Column width={5} className="profile_left" >
                    <Image src={getUser.avatar ?
                        getUser.avatar : ImageNotFound
                    } avatar 
                    onClick={ ()=> username === auth.username && handlerModal("avatar")} />
                </Grid.Column>
                <Grid.Column width={11} className="profile_right" >
                    <HeaderProfile 
                    handlerModal={handlerModal}
                    getUser={getUser} auth={auth} />
                    <Followers username={username} totalPublications={totalPublications}  />
                    <div className="other" >
                        <p className="name" >{getUser.name}</p>
                        {getUser.siteWeb && (
                            <a href={getUser.siteWeb} className="siteweb" 
                            target="_blank" >
                                {getUser.siteWeb}
                            </a>
                        ) } 
                        {getUser.description && (
                            <p className="description" >{getUser.description}</p>
                        )}
                    </div>
                </Grid.Column>
            </Grid>
            <ModalBasic show={showModal} setShow={setShowModal} title={titleModal} >
                {childrenModal}
            </ModalBasic>
        </>
    )
}
