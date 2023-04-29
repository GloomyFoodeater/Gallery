import * as React from 'react';
import { group } from '../utils/collections';
import AlbumItem from '../components/AlbumItem';

let albums = [{id: 1, name: "Hello"}, {id: 2, name: "World"}];

function AlbumsPage() {
    let i = 0;
    const itemsInRow = 3;
    const table = group(albums, () => Math.floor(i++ / itemsInRow));

    return (
        <div>
            {table.map(row =>
                <div className="row">
                    {row.map(album =>
                        <AlbumItem id={album.id} name={album.name} />
                    )}
                </div>)

            }
        </div>
    );
}

export default AlbumsPage;