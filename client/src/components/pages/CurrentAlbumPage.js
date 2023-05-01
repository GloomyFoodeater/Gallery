import React, {useContext, useEffect, useState} from 'react';
import {groupModulo} from "../../utils/collections";
import ImageToolbar from "../bars/ImageToolbar";
import Table from "../containers/Table";
import ImageItem from "../controls/ImageItem";
import * as gallery from "../../api/gallery";
import {resetSelection} from "../../utils/selection";
import {NavigationContext, SelectionContext} from "../../Contexts";

let markUp = <h1>Loading...</h1>;

function CurrentAlbumPage() {
    const [album, setAlbum] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const selectionContext = useContext(SelectionContext);
    const {activeAlbum: {id}} = useContext(NavigationContext);
    useEffect(() => {
        gallery.getAlbum(id)
            .then(({images}) => {
                images.sort((a, b) => a.name < b.name ? -1 : +1);
                setAlbum(images);
            })
            .catch(() => setAlbum(null))
            .finally(() => {
                resetSelection(selectionContext);
                setLoading(false)
            })
    }, []);

    if (isLoading)
        return markUp;

    if (album) {
        const table = groupModulo(album, 4);
        markUp = (
            <div className="container-fluid">
                <ImageToolbar images={album}/>
                <hr/>
                <Table item={ImageItem}>{table}</Table>
            </div>
        );
    } else markUp = <h1>Failed to fetch album!</h1>
    return markUp
}

export default CurrentAlbumPage;