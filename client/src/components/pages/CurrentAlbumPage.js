import React, {useContext, useEffect, useState} from 'react';
import {groupModulo} from "../../utils/collections";
import Table from "../containers/Table";
import ImageItem from "../controls/ImageItem";
import * as gallery from "../../api/rest";
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
            .then(({images}) => setAlbum(images))
            .catch(() => setAlbum(null))
            .finally(() => {
                resetSelection(selectionContext);
                setLoading(false)
            })
    }, [isLoading]); // Do not put other dependencies to avoid recursion

    if (isLoading)
        return markUp;

    if (album) {
        const table = groupModulo(album, 4);
        markUp = (
            <div className="container-fluid">
                <Table item={ImageItem}>{table}</Table>
            </div>
        );
    } else markUp = <h1>Failed to fetch album!</h1>
    return markUp
}

export default CurrentAlbumPage;