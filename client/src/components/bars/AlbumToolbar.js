import React, {useCallback, useContext} from 'react';
import SettingItem from "../controls/SettingItem";
import {SelectionContext} from "../../Contexts";
import {deleteAlbums} from "../../api/gallery";
import {resetSelection} from "../../utils/selection";

function AlbumToolbar() {
    const selectionContext = useContext(SelectionContext);
    const {selectionMode, setSelectionMode, selection} = selectionContext;

    const toggleSelection = useCallback(() => {
        resetSelection(selectionContext);
        setSelectionMode(!selectionMode)
    }, [selectionContext, selectionMode, setSelectionMode]);
    const deleteSelected = useCallback(() => {
        deleteAlbums(selection).catch(console.log);
    }, [selection]);

    return (
        <div>
            <SettingItem name="to-do-list" alt="Выделить" onClick={toggleSelection}/>
            <SettingItem name="check" alt="Выделить все" hidden={!selectionMode}/>
            <SettingItem name="add" alt="Добавить"/>
            <SettingItem name="remove" alt="Удалить" onClick={deleteSelected} hidden={!selectionMode}/>
        </div>
    );
}

export default AlbumToolbar;