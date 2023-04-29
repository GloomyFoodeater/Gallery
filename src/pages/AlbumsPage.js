import React from 'react';
import {groupModulo} from '../utils/collections';
import AlbumItem from '../components/AlbumItem';
import AlbumToolbar from "../components/AlbumToolbar";
import Table from "../components/Table";

let albums = [
    {id: 1, name: "hello"},
    {id: 2, name: "2"},
    {id: 3, name: "3"},
    {id: 4, name: "4"},
    {id: 5, name: "Hello"},
    {id: 6, name: "World"}
];

function AlbumsPage() {
    const table = groupModulo(albums, 6); // 3/2/1 items in row for lg/md/sm

    return (
        <div className="container-fluid">
            <AlbumToolbar/>
            <hr/>
            <Table item={AlbumItem}>{table}</Table>
        </div>
    );
}

export default AlbumsPage;