import React from 'react';
import SettingItem from "./SettingItem";

function ImageToolbar() {
    return (
        <div>
            <SettingItem name="to-do-list" alt="Выделить"/>
            <SettingItem name="check" alt="Выделить все"/>
            <SettingItem name="filter" alt="Фильтрация и сортировка"/>
            <SettingItem name="upload" alt="Загрузить"/>
            <SettingItem name="recycle-bin" alt="Удалить" hidden/>
            <SettingItem name="send" alt="В альбом" hidden/>
        </div>
    );
}

export default ImageToolbar;