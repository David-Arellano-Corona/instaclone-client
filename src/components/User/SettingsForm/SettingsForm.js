import React from 'react'
import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import useAuth from '../../../hooks/useAuth';
import PasswordForm  from '../PasswordForm';
import EmailForm  from '../EmailForm';
import DescriptionForm from '../DescriptionForm';
import SiteWebForm from '../SiteWebForm';
import './SettingsForm.scss'
export default function SettingsForm(props) {
    let {setShowModal, setTitleModal, setchildrenModal, getUser, refetch} = props;
    let history = useHistory();
    let client = useApolloClient()
    let { logout } = useAuth();


    let onChangePassword = () => {
        setTitleModal("Cambiar contraseña")
        setchildrenModal(
            <PasswordForm onLogut={onLogut} />
        )
    } 

    const onChangeEmail = () => {
        setTitleModal("Cambiar email")
        setchildrenModal(<EmailForm refetch={refetch} currentEmail={getUser.email} setShowModal={setShowModal} />)
    }

    const onChangeDescription = () => {
        setTitleModal("Actualizar tu biografia")
        setchildrenModal(<DescriptionForm
            setShowModal={setShowModal}
            currentDescription={getUser.description}
            refetch={refetch}
        />)
    }

    const onChangeSiteWeb = () => {
        setTitleModal("Actualizar sitio web")
        setchildrenModal(<SiteWebForm
            setShowModal={setShowModal}
            refetch={refetch}
            currentSiteWeb={getUser.siteWeb}
        />)
    }

    let onLogut = () => {
        client.clearStore();
        logout();
        history.push("/");
    }
    return (
        <div className="settings-form" >
            <Button onClick={onChangePassword} >Cambiar contraseña</Button>
            <Button onClick={onChangeEmail} >Cambiar email</Button>
            <Button onClick={onChangeDescription} >Descripción</Button>
            <Button onClick={onChangeSiteWeb} >Sitio web</Button>
            <Button onClick={()=> onLogut()} >Cerrar sesión</Button>
            <Button onClick={() => setShowModal(false)} >Cancelar</Button>
        </div>
    )
}
