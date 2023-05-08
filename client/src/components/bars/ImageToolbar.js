import React, {useCallback, useContext} from 'react';
import SettingItem from "../controls/SettingItem";
import {SelectionContext} from "../../Contexts";
import {deleteImages, postImages} from "../../api/gallery"
import {resetSelection} from "../../utils/selection";

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
    }, [selection, setSelection, selectionContext]);
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
            <SettingItem name="send" alt="В альбом" hidden={!selectionMode}/>
        </div>
    );
}

export default ImageToolbar;