import React, {useCallback, useContext, useEffect, useState} from 'react';
import {groupModulo} from '../../utils/collections';
import AlbumItem from '../controls/AlbumItem';
import AlbumToolbar from "../bars/AlbumToolbar";
import Table from "../containers/Table";
import * as gallery from "../../api/gallery";
import {NavigationContext, SelectionContext} from "../../Contexts";
import {resetSelection} from "../../utils/selection";

let markUp = <h1>Loading...</h1>;

function AlbumPage() {
    const [albums, setAlbums] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const selectionContext = useContext(SelectionContext);
    const {activeAlbum, setActiveAlbum} = useContext(NavigationContext);
    const onUpdate = useCallback(() => setLoading(true), [setLoading]);
    useEffect(() => {
        gallery.getAlbums()
            .then((result) => {
                if (activeAlbum && !result.find(album => album.id === activeAlbum.id)) setActiveAlbum(undefined);
                setAlbums(result)
            })
            .catch(() => setAlbums(null))
            .finally(() => {
                resetSelection(selectionContext);
                setLoading(false);
            });
    }, [isLoading]);

    if (isLoading) return markUp;
    if (albums) {
        const table = groupModulo(albums, 6); // 3/2/1 controls in row for lg/md/sm
        markUp = (
            <div className="container-fluid">
                <AlbumToolbar albums={albums} onUpdate={onUpdate}/>
                <hr/>
                <Table item={AlbumItem}>{table}</Table>
            </div>
        );
    } else markUp = <h1>Failed to fetch albums!</h1>

    return markUp;
}

export default AlbumPage;