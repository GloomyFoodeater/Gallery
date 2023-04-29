import * as React from 'react';

function ImageItem({id, name}) {
    return (
        <div className="col-lg-3 col-md-6 col-sm-12">
            <a data-fancybox="gallery" href={require('./../icons/image-placeholder.png')}>
                <img src={require('./../icons/image-placeholder.png')} alt={name} className="img-fluid"/>
            </a>
            <br/>
            <input type="checkbox" value={id}/>
            <button className="transparentButton">{name}</button>
        </div>
    );
}

export default ImageItem;