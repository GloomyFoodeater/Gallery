import React, {useCallback, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import {Button} from "react-bootstrap";
import {addAlbum} from "../../api/current";

function AddAlbum({show, hideModal, onUpdate}) {
    const [name, setName] = useState('');
    const erase = useCallback(() => setName(''), [setName]);
    const change = useCallback((event) => setName(event.currentTarget.value), [setName]);
    const confirm = () => {
        const onThen = () => {
            erase();
            hideModal();
            onUpdate();
        };
        addAlbum({name, onThen, onCatch: alert});
    };
    return (
        <Modal show={show} onHide={hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить альбом...</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Имя альбома:
                <input type="text" value={name} onChange={change}/>
                <Button variant="light" onClick={erase}>x</Button>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={confirm}>
                    Создать
                </Button>
                <Button variant="secondary" onClick={hideModal}>
                    Отмена
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddAlbum;