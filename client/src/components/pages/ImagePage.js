import * as React from 'react';
import {useEffect, useState} from 'react';
import ImageItem from '../controls/ImageItem';
import {groupModulo} from '../../utils/collections'
import ImageToolbar from "../bars/ImageToolbar";
import Table from "../containers/Table";
import * as gallery from "../../api/gallery";


function ImagePage() {
    const [images, setImages] = useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        gallery.getImages()
            .then((result) => {
                setImages(result);
                setLoading(false);
            })
            .catch(() => {
                setImages(null);
                setLoading(false);
            })
    }, []);

    if (isLoading)
        return <h1>Loading...</h1>;
    if (!images)
        return <h1>Failed to fetch images!</h1>

    const table = groupModulo(images, 4);

    return (
        <div className="container-fluid">
            <ImageToolbar/>
            <hr/>
            <Table item={ImageItem}>{table}</Table>
        </div>
    );
}

export default ImagePage;