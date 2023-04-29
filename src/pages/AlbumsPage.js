import * as React from 'react';
import {group} from '../utils/collections';
import AlbumItem from '../components/AlbumItem';
import AlbumToolbar from "../components/AlbumToolbar";
import Table from "../components/Table";

let albums = [{id: 1, name: "Hello"}, {id: 2, name: "World"}];

function AlbumsPage() {
    let i = 0;
    const itemsInRow = 3;
    const table = group(albums, () => Math.floor(i++ / itemsInRow));

    return (
        <div>
            <AlbumToolbar/>
            <hr/>
            <Table item={AlbumItem}>{table}</Table>
        </div>
    );
}

export default AlbumsPage;