import React from 'react';

function Table({children, item}) {
    return (
        <div>
            {children.map((row, index) =>
                <div className="row" key={index} style={{textAlign: "center"}}>
                    {row.map(({id, name}) => React.createElement(item, {id, name, key: id}))}
                </div>)
            }
        </div>
    );
}

export default Table;