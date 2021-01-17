import React from 'react';
import { Modal } from 'semantic-ui-react';
import './ModalBasic.scss';

export default function ModalBasic(props) {
    let { show, setShow, title, children } = props;
    let onclose = () => {
        setShow(false);
    }
    return (
        <Modal size="mini" open={show} onClose={onclose} className="modal-basic" >
            { title && <Modal.Header>{title}</Modal.Header> }
            {children}
        </Modal>
    )
}
