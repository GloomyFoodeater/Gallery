import React, {useCallback, useContext} from 'react';
import SettingItem from "../controls/SettingItem";
import {SelectionContext} from "../../Contexts";
import {deleteAlbums} from "../../api/gallery";
import {resetSelection} from "../../utils/selection";

function AlbumToolbar({albums, onUpdate}) {
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
        resetSelection(selectionContext);
        setSelectionMode(!selectionMode)
    }, [selectionContext, selectionMode, setSelectionMode]);
    const selectAll = () => {
        let updatedSelection = new Set(nextSelectAll ? albums.map(image => image.id) : []);
        setSelection(updatedSelection);
        setNextSelectAll(!nextSelectAll);
    }
    const deleteSelected = useCallback(() => {
        deleteAlbums(selection).then(onUpdate);
    }, [selection]);

    return (
        <div>
            <SettingItem name="to-do-list" alt="Выделить" onClick={toggleSelection}/>
            <SettingItem name="check" alt="Выделить все" onClick={selectAll} hidden={!selectionMode}/>
            <SettingItem name="add" alt="Добавить"/>
            <SettingItem name="remove" alt="Удалить" onClick={deleteSelected} hidden={!selectionMode}/>
        </div>
    );
}

export default AlbumToolbar;