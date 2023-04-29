import React, {useCallback, useContext} from 'react';
import SettingItem from "./SettingItem";
import {NavigationContext} from "../App";

function AlbumToolbar() {
    const {selectionMode, setSelectionMode} = useContext(NavigationContext);
    const toggleSelection = useCallback(() => setSelectionMode(!selectionMode), [selectionMode, setSelectionMode]);

    return (
        <div>
            <SettingItem name="to-do-list" alt="Выделить" onClick={toggleSelection}/>
            <SettingItem name="check" alt="Выделить все" hidden/>
            <SettingItem name="add" alt="Добавить"/>
            <SettingItem name="remove" alt="Удалить" hidden/>
        </div>
    );
}

export default AlbumToolbar;