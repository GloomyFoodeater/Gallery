import React, {useContext, useEffect, useState} from 'react';
import {groupModulo} from "../../utils/collections";
import Table from "../containers/Table";
import ImageItem from "../controls/ImageItem";
import {getAlbum} from "../../api/current";
import {resetActivePage} from "../../utils/reset";
import {NavigationContext, SelectionContext, UserContext} from "../../Contexts";
import Spinner from "../visual/Spinner";

function CurrentAlbumPage() {
    const [album, setAlbum] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const selectionContext = useContext(SelectionContext);
    const userContext = useContext(UserContext);
    const {activeAlbum: {id}} = useContext(NavigationContext);
    useEffect(() => {
        if (isLoading) {
            const onCatch = () => setAlbum(null)
            const onFinally = () => {
                resetActivePage(selectionContext, userContext);
                setLoading(false);
            }
            getAlbum({id, onThen: setAlbum, onCatch, onFinally})
        }
    }, [isLoading]); // Do not put other dependencies to avoid recursion


    if (isLoading || !album) return <Spinner isError={!isLoading && !album}/>;
    const table = groupModulo(album.images, 4);
    return (
        <div className="container-fluid">
            <Table item={ImageItem}>{table}</Table>
        </div>
    );
}

export default CurrentAlbumPage;