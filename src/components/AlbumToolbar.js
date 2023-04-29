import React, {useCallback, useContext} from 'react';
import SettingItem from "./SettingItem";
import {SelectionContext} from "../Contexts";

function AlbumToolbar() {
    const {selectionMode, setSelectionMode} = useContext(SelectionContext);

    const toggleSelection = useCallback(() => setSelectionMode(!selectionMode), [selectionMode, setSelectionMode]);

    return (
        <div>
            <SettingItem name="to-do-list" alt="Выделить" onClick={toggleSelection}/>
            <SettingItem name="check" alt="Выделить все" hidden={!selectionMode}/>
            <SettingItem name="add" alt="Добавить"/>
            <SettingItem name="remove" alt="Удалить" hidden={!selectionMode}/>
        </div>
    );
}

export default AlbumToolbar;