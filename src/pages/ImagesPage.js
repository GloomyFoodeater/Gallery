import * as React from 'react';
import ImageItem from '../components/ImageItem';
import {group} from '../utils/collections'
import ImageToolbar from "../components/ImageToolbar";

let images = [{id: 1, name: "hello"}, {id: 2, name: 2}, {id: 3, name: 3}, {id: 4, name: 4}, {id: 5, name: 5}];

function ImagesPage() {

    let i = 0;
    const itemsInRow = 4;
    const table = group(images, () => Math.floor(i++ / itemsInRow));

    return (<div className="container-fluid">
        <ImageToolbar/>
        <hr/>
        <div>
            {table.map((row, idx) => <div className="row" key={idx}>
                {row.map(image => <ImageItem id={image.id} name={image.name} key={image.id}/>)}
            </div>)}
        </div>
    </div>);
}

export default ImagesPage;