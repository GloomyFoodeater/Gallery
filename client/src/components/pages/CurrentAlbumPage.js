import React, {useContext, useEffect, useState} from 'react';
import {groupModulo} from "../../utils/collections";
import ImageToolbar from "../bars/ImageToolbar";
import Table from "../containers/Table";
import ImageItem from "../controls/ImageItem";
import * as gallery from "../../api/gallery";
import {resetSelection} from "../../utils/selection";
import {SelectionContext} from "../../Contexts";

function CurrentAlbumPage() {
    const [album, setAlbum] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const selectionContext = useContext(SelectionContext);
    useEffect(() => {
        gallery.getAlbum()
            .then((result) => setAlbum(result))
            .catch(() => setAlbum(null))
            .finally(() => {
                resetSelection(selectionContext);
                setLoading(false)
            })
    }, []);

    if (isLoading)
        return <h1>Loading...</h1>;
    if (!album)
        return <h1>Failed to fetch album!</h1>

    const table = groupModulo(album, 4);

    return (
        <div className="container-fluid">
            <ImageToolbar/>
            <hr/>
            <Table item={ImageItem}>{table}</Table>
        </div>
    );
}

export default CurrentAlbumPage;