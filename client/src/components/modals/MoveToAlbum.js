import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import {getAlbums, moveImages} from "../../api/current";
import {SelectionContext, UserContext} from "../../Contexts";
import {resetActivePage} from "../../utils/reset";

function MoveToAlbum({show, hideModal}) {
    const [albums, setAlbums] = useState([]);
    const [activeId, setActiveId] = useState(undefined);
    const selectionContext = useContext(SelectionContext);
    const userContext = useContext(UserContext);
    const {selection} = selectionContext;
    const confirm = () => {
        const onThen = () => {
            hideModal();
            resetActivePage(selectionContext, userContext);
        }
        moveImages({selection, id: activeId, onThen, onCatch: alert});
    };

    useEffect(() => {
        const onThen = (result) => {
            setAlbums(result);
            setActiveId(result[0]?.id);
        };
        getAlbums({onThen, onCatch: alert});
    }, [show]);

    return (
        <Modal show={show} onHide={hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>Перенести в альбом...</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Имя альбома:
                <select
                    onChange={(event) => setActiveId(event.currentTarget.options[event.currentTarget.selectedIndex].value)}>
                    {albums.map(album => <option key={album.id} value={album.id}>{album.name}</option>)}
                </select>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={confirm}>
                    Перенести
                </Button>
                <Button variant="secondary" onClick={hideModal}>
                    Отмена
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MoveToAlbum;