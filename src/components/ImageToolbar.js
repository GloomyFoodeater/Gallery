import React, {useCallback, useContext} from 'react';
import SettingItem from "./SettingItem";
import {NavigationContext} from "../App";

function ImageToolbar() {
    const {selectionMode, setSelectionMode} = useContext(NavigationContext);
    const toggleSelection = useCallback(() => setSelectionMode(!selectionMode), [selectionMode, setSelectionMode]);

    return (
        <div>
            <SettingItem name="to-do-list" alt="Выделить" onClick={toggleSelection}/>
            <SettingItem name="check" alt="Выделить все"/>
            <SettingItem name="filter" alt="Фильтрация и сортировка"/>
            <SettingItem name="upload" alt="Загрузить"/>
            <SettingItem name="recycle-bin" alt="Удалить" hidden/>
            <SettingItem name="send" alt="В альбом" hidden/>
        </div>
    );
}

export default ImageToolbar;