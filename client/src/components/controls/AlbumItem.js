import React, {useCallback, useContext} from 'react';
import {NavigationContext, SelectionContext} from "../../Contexts";
import CurrentAlbumPage from "../pages/CurrentAlbumPage";

function AlbumItem({id, name}) {
    const {selectionMode, selection, setSelection} = useContext(SelectionContext);
    const {setActivePage, setActiveAlbum} = useContext(NavigationContext);
    const onChange = useCallback(() => {
        if (selection.has(id)) selection.delete(id);
        else selection.add(id);
        setSelection(new Set(selection))
    }, [id, selection, setSelection]);
    const checked = selection.has(id);
    const onClick = useCallback(() => {
        setActiveAlbum({id, name});
        setActivePage({ctor: CurrentAlbumPage});
    }, [id, name, setActiveAlbum, setActivePage]);
    const display = selectionMode ? "inline-block" : "none";

    const img = <img src={require("./../../icons/folder.png")} alt="Folder" className="img-fluid img-thumbnail"/>

    return (
        <div className="col-lg-4 col-md-6 col-sm-12">
            {selectionMode
                ? <label htmlFor={`album-check-${id}`}>{img}</label>
                : <span onClick={onClick}>{img}</span>
            }
            <br/>
            <input id={`album-check-${id}`} type="checkbox" value={id} style={{display}} checked={checked}
                   onChange={onChange}/>
            {selectionMode
                ? <label htmlFor={`album-check-${id}`}>{name}</label>
                : <button className="itemName" onClick={onClick}>{name}</button>
            }
        </div>
    );
}

export default AlbumItem;