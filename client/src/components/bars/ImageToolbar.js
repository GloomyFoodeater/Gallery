import React, {useCallback, useContext, useState} from 'react';
import SettingItem from "../controls/SettingItem";
import {SelectionContext, UserContext} from "../../Contexts";
import {deleteImages, postImages} from "../../api/current"
import {resetActivePage} from "../../utils/reset";
import MoveToAlbum from "../modals/MoveToAlbum";

function ImageToolbar({images, onUpdate}) {
    const selectionContext = useContext(SelectionContext);
    const userContext = useContext(UserContext);
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
        resetActivePage(selectionContext, userContext)
        setSelectionMode(!selectionMode)
    }, [selectionContext, selectionMode, setSelectionMode]);
    const selectAll = () => {
        const updatedSelection = new Set(nextSelectAll ? images.map(image => image.id) : []);
        setSelection(updatedSelection);
        setNextSelectAll(!nextSelectAll);
    }
    const deleteSelected = () => deleteImages({selection, onThen: onUpdate, onCatch: alert});
    const addFiles = ({currentTarget: {files}}) => postImages({files, onThen: onUpdate, onCatch: alert})

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