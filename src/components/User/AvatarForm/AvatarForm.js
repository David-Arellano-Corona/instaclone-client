import React,{ useCallback, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify'
import { useMutation } from '@apollo/client';
import { UPDATE_AVATAR, GET_USER, DELETE_AVATAR } from '../../../gql/user'
import './Avatarform.scss';

export default function AvatarForm(props) {
    let { setShowModal, auth } = props;
    const [loading, setLoading] = useState(false)

    const [updateAvatar] = useMutation(UPDATE_AVATAR,{
        update(cache, {data:{updateAvatar}}){
            let { getUser } = cache.readQuery({
                query:GET_USER,
                variables:{username:auth.username}
            })
            cache.writeQuery({
                query:GET_USER,
                variables:{username:auth.username},
                data:{
                    getUser:{
                        ...getUser,
                        avatar: updateAvatar.urlAvatar
                    }
                }
            })
        }
    });

    const [ deleteAvatar ] = useMutation(DELETE_AVATAR,{
        update(cache, {data:{updateAvatar}}){
            let { getUser } = cache.readQuery({
                query:GET_USER,
                variables:{username:auth.username}
            })
            cache.writeQuery({
                query:GET_USER,
                variables:{username:auth.username},
                data:{
                    getUser:{
                        ...getUser,
                        avatar: ""
                    }
                }
            })
        }
    })

    let onDrop = useCallback( async (acceptedFile) => {
        let file = acceptedFile[0];
        try{
            setLoading(true);
            let result = await updateAvatar({
                variables:{
                    file
                }
            })
            let { data } = result;
            console.log(data.updateAvatar.urlAvatar)
            if(!data.updateAvatar.status){
                toast.warning("Error al actualizar el avatar")
                setLoading(false);
            }else{
                setLoading(false)
                setShowModal(false)
            }
        }catch(err){
            console.log(err);
        }
    },[])

    let {getRootProps, getInputProps} = useDropzone({
        accept:"imge/jpeg,image/png",
        noKeyboard:true,
        multiple:false,
        onDrop
    });
    
    let onDeleteAvatar = async () => {
        try{
            let result = await deleteAvatar();
            let { data } = result;
            if(!data.deleteAvatar){
                toast.warning("Error al borrar el avatar");
            }else{
                setShowModal(false);
            }
        }catch(err){
            console.log(err)
            toast.warning("Error al borrar el avatar");
        }
    }

    return (
        <div className="avatar-form" >
            <Button {...getRootProps()} loading={loading} >Cargar una foto</Button>
            <Button onClick={ onDeleteAvatar } >Eliminar foto actual</Button>
            <Button onClick={ () => setShowModal(false) } >Cancelar</Button>
            <input {...getInputProps()} />
        </div>
    )
}
