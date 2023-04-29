import React, {useCallback, useContext} from 'react';
import SettingItem from "./SettingItem";
import {SelectionContext} from "../Contexts";

function ImageToolbar() {
    const {selectionMode, setSelectionMode} = useContext(SelectionContext);

    const toggleSelection = useCallback(() => setSelectionMode(!selectionMode), [selectionMode, setSelectionMode]);

    return (
        <div>
            <SettingItem name="to-do-list" alt="Выделить" onClick={toggleSelection}/>
            <SettingItem name="check" alt="Выделить все" hidden={!selectionMode}/>
            <SettingItem name="filter" alt="Фильтрация и сортировка"/>
            <SettingItem name="upload" alt="Загрузить"/>
            <SettingItem name="recycle-bin" alt="Удалить" hidden={!selectionMode}/>
            <SettingItem name="send" alt="В альбом" hidden={!selectionMode}/>
        </div>
    );
}

export default ImageToolbar;