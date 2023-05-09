import * as React from 'react';
import {useCallback, useContext, useEffect, useState} from 'react';
import ImageItem from '../controls/ImageItem';
import {groupModulo} from '../../utils/collections'
import ImageToolbar from "../bars/ImageToolbar";
import Table from "../containers/Table";
import * as gallery from "../../api/rest";
import {SelectionContext} from "../../Contexts";
import {resetSelection} from "../../utils/selection";

let markUp = <h1>Loading...</h1>;

function ImagePage() {
    const [images, setImages] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const selectionContext = useContext(SelectionContext);
    const onUpdate = useCallback(() => setLoading(true), [setLoading]);
    useEffect(() => {
        gallery.getImages()
            .then((result) => setImages(result))
            .catch(() => setImages(null))
            .finally(() => {
                resetSelection(selectionContext);
                setLoading(false)
            });
    }, [isLoading]); // Do not put other dependencies to avoid recursion

    if (isLoading)
        return markUp;

    if (images) {
        const table = groupModulo(images, 4);
        markUp = (
            <div className="container-fluid">
                <ImageToolbar images={images} onUpdate={onUpdate}/>
                <hr/>
                <Table item={ImageItem}>{table}</Table>
            </div>
        );
    } else markUp = <h1>Failed to fetch images!</h1>;
    return markUp;
}

export default ImagePage;