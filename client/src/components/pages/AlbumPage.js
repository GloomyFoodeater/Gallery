import React, {useCallback, useContext, useEffect, useState} from 'react';
import {groupModulo} from '../../utils/collections';
import AlbumItem from '../controls/AlbumItem';
import AlbumToolbar from "../bars/AlbumToolbar";
import Table from "../containers/Table";
import {getAlbums} from "../../api/current";
import {NavigationContext, SelectionContext, UserContext} from "../../Contexts";
import {resetActivePage} from "../../utils/reset";
import Spinner from "../visual/Spinner";

function AlbumPage() {
    const [albums, setAlbums] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const selectionContext = useContext(SelectionContext);
    const userContext = useContext(UserContext);
    const {activeAlbum, setActiveAlbum} = useContext(NavigationContext);
    const onUpdate = useCallback(() => setLoading(true), [setLoading]);
    useEffect(() => {
        if (isLoading) {
            const onThen = (result) => {
                if (activeAlbum && !result.find(album => album.id === activeAlbum.id)) setActiveAlbum(undefined);
                setAlbums(result)
            }
            const onCatch = () => setAlbums(null)
            const onFinally = () => {
                resetActivePage(selectionContext, userContext);
                setLoading(false);
            }
            getAlbums({onThen, onCatch, onFinally});
        }
    }, [isLoading]); // Do not put other dependencies to avoid recursion

    if (isLoading || !albums) return <Spinner isError={!isLoading && !albums}/>;
    const table = groupModulo(albums, 6); // 3/2/1 controls in row for lg/md/sm
    return (
        <div className="container-fluid">
            <AlbumToolbar albums={albums} onUpdate={onUpdate}/>
            <hr/>
            <Table item={AlbumItem}>{table}</Table>
        </div>
    );
}

export default AlbumPage;