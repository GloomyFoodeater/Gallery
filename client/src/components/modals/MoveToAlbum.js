import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import {getAlbums, moveImages} from "../../api/rest";
import {SelectionContext} from "../../Contexts";
import {resetSelection} from "../../utils/selection";

function MoveToAlbum({show, hideModal}) {
    const [albums, setAlbums] = useState([]);
    const [activeId, setActiveId] = useState(undefined);
    const selectionContext = useContext(SelectionContext);
    const {selection} = selectionContext;
    const confirm = () => {
        moveImages(selection, activeId).then(() => {
            hideModal();
            resetSelection(selectionContext);
        }).catch(console.log);
    };

    useEffect(() => {
        getAlbums().then(result => {
            setAlbums(result);
            setActiveId(result[0]?.id);
        });
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