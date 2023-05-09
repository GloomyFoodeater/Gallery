import React, {useCallback, useContext, useEffect, useState} from 'react';
import {groupModulo} from '../../utils/collections';
import AlbumItem from '../controls/AlbumItem';
import AlbumToolbar from "../bars/AlbumToolbar";
import Table from "../containers/Table";
import {getAlbums} from "../../api/current";
import {NavigationContext, SelectionContext, UserContext} from "../../Contexts";
import {resetActivePage} from "../../utils/reset";

let markUp = <h1>Loading...</h1>;

function AlbumPage() {
    const [albums, setAlbums] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const selectionContext = useContext(SelectionContext);
    const userContext = useContext(UserContext);
    const {activeAlbum, setActiveAlbum} = useContext(NavigationContext);
    const onUpdate = useCallback(() => setLoading(true), [setLoading]);
    useEffect(() => {
        const onThen = (result) => {
            if (activeAlbum && !result.find(album => album.id === activeAlbum.id)) setActiveAlbum(undefined);
            setAlbums(result)
        }
        const onCatch = (reason) => {
            setAlbums(null);
            alert(reason);
        }
        const onFinally = () => {
            resetActivePage(selectionContext, userContext);
            setLoading(false);
        }
        getAlbums({onThen, onCatch, onFinally});
    }, [isLoading]); // Do not put other dependencies to avoid recursion

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
    } else markUp = <h1>Не удалось загрузить альбомы</h1>

    return markUp;
}

export default AlbumPage;