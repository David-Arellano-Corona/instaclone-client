import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user';
import './SiteWebForm.scss';
export default function SiteWebForm(props) {
    let { setShowModal, currentSiteWeb, refetch} = props;
    
    let  [updateUser] = useMutation(UPDATE_USER);

    let formik = useFormik({
        initialValues:{
            siteWeb:currentSiteWeb || ''
        },
        validationSchema:Yup.object({
            siteWeb: Yup.string().required()
        }),
        onSubmit: async (formData) => {
            try{
                await updateUser({
                    variables:{
                        input: formData
                    }
                })
                refetch()
                setShowModal(false)
            }catch(err){
                console.log(err)
                toast.error("Error al actualizar tu sitio web")
            }
        }
    })

    return (
        <Form className="site-web-form"  onSubmit={formik.handleSubmit} >
            <Form.Input
                placeholder="url web"
                name="siteWeb"
                value={formik.values.siteWeb}
                onChange={formik.handleChange}
                error={formik.errors.siteWeb && true }
            />
            <Button type="submit" className="btn-submit" >actualizar</Button>
        </Form>
    )
}
