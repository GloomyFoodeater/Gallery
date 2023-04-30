import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import ImageItem from '../controls/ImageItem';
import {groupModulo} from '../../utils/collections'
import ImageToolbar from "../bars/ImageToolbar";
import Table from "../containers/Table";
import * as gallery from "../../api/gallery";
import {SelectionContext} from "../../Contexts";
import {resetSelection} from "../../utils/selection";

function ImagePage() {
    const [images, setImages] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const selectionContext = useContext(SelectionContext);
    useEffect(() => {
        gallery.getImages()
            .then((result) => setImages(result))
            .catch(() => setImages(null))
            .finally(() => {
                resetSelection(selectionContext);
                setLoading(false)
            });
    }, []);

    if (isLoading)
        return <h1>Loading...</h1>;
    if (!images)
        return <h1>Failed to fetch images!</h1>

    const table = groupModulo(images, 4);

    return (
        <div className="container-fluid">
            <ImageToolbar images={images}/>
            <hr/>
            <Table item={ImageItem}>{table}</Table>
        </div>
    );
}

export default ImagePage;