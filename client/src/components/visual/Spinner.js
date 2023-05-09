import React from 'react';
import {Spinner as ReactSpinner} from "react-bootstrap";

function Spinner({isError}) {
    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            {isError ? <h1>Не удалось загрузить ресурс</h1> : <ReactSpinner animation="border"/>};
        </div>
    );
}

export default Spinner;