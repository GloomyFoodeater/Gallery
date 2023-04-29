import React from 'react';
import SettingItem from "./SettingItem";

function AlbumToolbar() {
    return (
        <div>
            <SettingItem name="to-do-list" alt="Выделить"/>
            <SettingItem name="check" alt="Выделить все" hidden/>
            <SettingItem name="add" alt="Добавить"/>
            <SettingItem name="remove" alt="Удалить" hidden/>
        </div>
    );
}

export default AlbumToolbar;