import React, {useCallback, useContext} from 'react';
import SettingItem from "../controls/SettingItem";
import {SelectionContext} from "../../Contexts";
import {deleteImages} from "../../api/gallery"
import {resetSelection} from "../../utils/selection";

function ImageToolbar() {
    const selectionContext = useContext(SelectionContext);
    const {selectionMode, setSelectionMode, selection} = selectionContext;

    const toggleSelection = useCallback(() => {
        resetSelection(selectionContext)
        setSelectionMode(!selectionMode)
    }, [selectionContext, selectionMode, setSelectionMode]);
    const deleteSelected = useCallback(() => {
        deleteImages(selection).catch(console.log);
    }, [selection]);

    return (
        <div>
            <SettingItem name="to-do-list" alt="Выделить" onClick={toggleSelection}/>
            <SettingItem name="check" alt="Выделить все" hidden={!selectionMode}/>
            <SettingItem name="filter" alt="Фильтрация и сортировка"/>
            <SettingItem name="upload" alt="Загрузить"/>
            <SettingItem name="recycle-bin" alt="Удалить" onClick={deleteSelected} hidden={!selectionMode}/>
            <SettingItem name="send" alt="В альбом" hidden={!selectionMode}/>
        </div>
    );
}

export default ImageToolbar;