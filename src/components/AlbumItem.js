import * as React from 'react';

function AlbumItem({id, name}) {
    return (
        <div className="col-lg-4 col-md-6 col-sm-12 image-container">
            <img src="./../../icons/folder.png" alt={name} className="img-thumbnail"/>
            <br/>
            <input type="checkbox" value={id}/>
            <a href={`/albums/${id}`}>{name}</a>
        </div>
    );
}

export default AlbumItem;