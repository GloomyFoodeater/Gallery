import React, {useCallback, useContext} from 'react';
import {Context} from "../App";
import CurrentAlbumPage from "../pages/CurrentAlbumPage";

function AlbumItem({id, name}) {
    const {setActivePage, setActiveAlbum} = useContext(Context);
    const onClick = useCallback(() => {
        setActiveAlbum({id, name});
        setActivePage({ctor: CurrentAlbumPage})
    }, [id, name, setActiveAlbum, setActivePage]);

    return (
        <div className="col-lg-4 col-md-6 col-sm-12">
            <img
                src={require("./../icons/folder.png")}
                alt="Folder"
                className="img-fluid img-thumbnail"/>
            <br/>
            <input type="checkbox" value={id}/>
            <button className="transparentButton" onClick={onClick}> {name} </button>
        </div>
    );
}

export default AlbumItem;