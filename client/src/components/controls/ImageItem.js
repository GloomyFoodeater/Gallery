import React, {useCallback, useContext} from 'react';
import {SelectionContext} from "../../Contexts";

function ImageItem({id, name}) {
    const {selectionMode, selection, setSelection} = useContext(SelectionContext);
    const onChange = useCallback(() => {
        if (selection.has(id)) selection.delete(id);
        else selection.add(id);
        setSelection(new Set(selection))
    }, [id, selection, setSelection]);
    const checked = selection.has(id);
    const display = selectionMode ? "inline-block" : "none";

    return (
        <div className="col-lg-3 col-md-6 col-sm-12">
            <a data-fancybox="gallery" href={require('./../../icons/image-placeholder.png')}>
                <img src={require('./../../icons/image-placeholder.png')} alt={name} className="img-fluid"/>
            </a>
            <br/>
            <input type="checkbox" value={id} style={{display}} checked={checked} onChange={onChange}/>
            <button className="transparentButton">{name}</button>
        </div>
    );
}

export default ImageItem;