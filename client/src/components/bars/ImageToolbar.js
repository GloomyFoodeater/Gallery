import React, {useCallback, useContext, useState} from 'react';
import SettingItem from "../controls/SettingItem";
import {SelectionContext} from "../../Contexts";
import {deleteImages, postImages} from "../../api/gallery"
import {resetSelection} from "../../utils/selection";
import MoveToAlbum from "../modals/MoveToAlbum";

function ImageToolbar({images, onUpdate}) {
    const selectionContext = useContext(SelectionContext);
    const {
        selectionMode,
        setSelectionMode,
        selection,
        setSelection,
        nextSelectAll,
        setNextSelectAll
    } = selectionContext;
    const [showMoveModal, setShowMoveModal] = useState(false);

    const showMove = useCallback(() => setShowMoveModal(true), [setShowMoveModal]);
    const hideMove = useCallback(() => setShowMoveModal(false), [setShowMoveModal]);
    const toggleSelection = useCallback(() => {
        resetSelection(selectionContext)
        setSelectionMode(!selectionMode)
    }, [selectionContext, selectionMode, setSelectionMode]);
    const selectAll = () => {
        let updatedSelection = new Set(nextSelectAll ? images.map(image => image.id) : []);
        setSelection(updatedSelection);
        setNextSelectAll(!nextSelectAll);
    }
    const deleteSelected = useCallback(() => {
        deleteImages(selection).then(onUpdate);
    }, [selection, onUpdate]);
    const addFiles = (event) => {
        postImages(event.currentTarget.files).then(onUpdate);
    }

    return (
        <div>
            <SettingItem name="to-do-list" alt="Выделить" onClick={toggleSelection}/>
            <SettingItem name="check" alt="Выделить все" onClick={selectAll} hidden={!selectionMode}/>
            <label htmlFor="image-input">
                <SettingItem name="upload" alt="Загрузить"/>
            </label>
            <input type="file" multiple id='image-input' onChange={addFiles} hidden/>
            <SettingItem name="recycle-bin" alt="Удалить" onClick={deleteSelected} hidden={!selectionMode}/>
            <MoveToAlbum show={showMoveModal} hideModal={hideMove}/>
            <SettingItem name="send" alt="В альбом" hidden={!selectionMode} onClick={showMove}/>
        </div>
    );
}

export default ImageToolbar;