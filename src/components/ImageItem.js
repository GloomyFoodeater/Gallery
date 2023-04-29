import * as React from 'react';


function onImageClick(event) {
    // TODO: Implement
}

function onNameClick(event) {
    // TODO: Implement
}

function ImageItem({id, name}) {
    return (<div className="col-lg-3 col-md-6 col-sm-12 image-container">
        <a data-fancybox="gallery" href={`/images/${id}`} className="img-fluid">
            <img src={`/images/${id}`} alt={name}/>
        </a>
        <br/>
        <input type="checkbox" name={id}/>
        <a href={`/images/${id}/download`}>{name}</a>
    </div>)
}

export default ImageItem;