import * as React from 'react';
import {useCallback, useContext, useEffect, useState} from 'react';
import ImageItem from '../controls/ImageItem';
import {groupModulo} from '../../utils/collections'
import ImageToolbar from "../bars/ImageToolbar";
import Table from "../containers/Table";
import * as gallery from "../../api/current";
import {SelectionContext, UserContext} from "../../Contexts";
import {resetActivePage} from "../../utils/reset";
import Spinner from "../visual/Spinner";

function ImagePage() {
    const [images, setImages] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const selectionContext = useContext(SelectionContext);
    const userContext = useContext(UserContext);
    const onUpdate = useCallback(() => setLoading(true), [setLoading]);
    useEffect(() => {
        if (isLoading) {
            const onCatch = () => setImages(null);
            const onFinally = () => {
                resetActivePage(selectionContext, userContext);
                setLoading(false);
            };
            gallery.getImages({onThen: setImages, onFinally, onCatch});
        }
    }, [isLoading]); // Do not put other dependencies to avoid recursion

    if (isLoading || !images) return <Spinner isError={!isLoading && !images}/>;
    const table = groupModulo(images, 4);
    return (
        <div className="container-fluid">
            <ImageToolbar images={images} onUpdate={onUpdate}/>
            <hr/>
            <Table item={ImageItem}>{table}</Table>
        </div>
    );
}

export default ImagePage;