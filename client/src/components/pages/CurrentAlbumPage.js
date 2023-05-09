import React, {useContext, useEffect, useState} from 'react';
import {groupModulo} from "../../utils/collections";
import Table from "../containers/Table";
import ImageItem from "../controls/ImageItem";
import {getAlbum} from "../../api/current";
import {resetActivePage} from "../../utils/reset";
import {NavigationContext, SelectionContext, UserContext} from "../../Contexts";

let markUp = <h1>Loading...</h1>;

function CurrentAlbumPage() {
    const [album, setAlbum] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const selectionContext = useContext(SelectionContext);
    const userContext = useContext(UserContext);
    const {activeAlbum: {id}} = useContext(NavigationContext);
    useEffect(() => {
        const onCatch = (reason) => {
            setAlbum(null);
            alert(reason);
        }
        const onFinally = () => {
            resetActivePage(selectionContext, userContext);
            setLoading(false);
        }
        getAlbum({id, onThen: setAlbum, onCatch, onFinally})
    }, [isLoading]); // Do not put other dependencies to avoid recursion

    if (isLoading)
        return markUp;

    if (album) {
        const table = groupModulo(album.images, 4);
        markUp = (
            <div className="container-fluid">
                <Table item={ImageItem}>{table}</Table>
            </div>
        );
    } else markUp = <h1>Не удалось загрузить альбом</h1>
    return markUp
}

export default CurrentAlbumPage;