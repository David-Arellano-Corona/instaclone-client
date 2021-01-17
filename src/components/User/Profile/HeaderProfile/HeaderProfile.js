import React from 'react';
import { Button } from 'semantic-ui-react';
import { useQuery, useMutation } from '@apollo/client';
import { IS_FOLLOW, FOLLOW, UN_FOLLOW } from '../../../../gql/follow';
import './HeaderProfile.scss';

export default function HeaderProfile(props) {
    let { getUser, auth, handlerModal} = props;
    const { data, loading, refetch } = useQuery(IS_FOLLOW,{
        variables:{
            username: getUser.username
        }
    })

    const [ follow ] = useMutation(FOLLOW);
    const [ unFollow ] = useMutation(UN_FOLLOW);


    const ButtonFollow = () => {
        if(data.isFollow){
            return (<Button className="btn-danger" onClick={onUnFollow} >
                Dejar de seguir
            </Button>)
        }else{
            return (
                <Button className="btn-action" onClick={onFollow} >Seguir</Button>
            )
        }
    }

    const onUnFollow = async () => {
        try{
            await unFollow({
                variables:{
                    username: getUser.username
                }
            })
            refetch();
        }catch(err){
            console.log(err);
        }
    }

    const onFollow = async () => {
        try{
            let result = await follow({
                variables:{
                    username: getUser.username
                }
            })
            refetch()
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div className="header-profile" >
            <h2>{getUser.username}</h2>
            {
                getUser.username == auth.username ?
                (<Button onClick={ () => handlerModal("settings") } >Ajustes</Button>):
                (
                  !loading &&  <ButtonFollow/>
                )
            }
        </div>
    )
}
