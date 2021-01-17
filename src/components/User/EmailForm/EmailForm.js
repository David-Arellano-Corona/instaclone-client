import React from 'react'
import { Form, Button } from 'semantic-ui-react';
import {useFormik} from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user';
import './EmailForm.scss';

export default function EmailForm(props) {
    let { currentEmail, setShowModal, refetch} = props;
    const [updateUser]= useMutation(UPDATE_USER);

    const formik = useFormik({
        initialValues:{
            email:currentEmail || ""
        },
        validationSchema:Yup.object({
            email:Yup.string().required().email()
        }),
        onSubmit: async (formData) => {
            try{
                await updateUser({
                    variables:{
                        input:formData
                    }
                })
                refetch()
                setShowModal(false);
            }catch(err){
                console.log(err);
                toast.err("Error al actualizar el email");
            }
        }
    })
    return (
        <Form className="email-form"  onSubmit={formik.handleSubmit} >
            <Form.Input
                placeholder="Escribe tu nuevo emai"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={ formik.errors.email && true }
            />
            <Button type="submit" className="btn-submit" >Actualizar</Button>
        </Form>
    )
}
