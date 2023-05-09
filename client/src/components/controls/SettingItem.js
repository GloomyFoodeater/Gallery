import * as React from 'react';

function SettingItem({name, alt, hidden, onClick}) {
    return (
        <div style={{display: "inline-block", cursor: "pointer"}} className={`itemName ${hidden ? 'hidden' : ''}`}
             onClick={onClick}>
            <img
                src={require(`./../../icons/${name}.png`)}
                alt={alt}
                className="icon"/>
        </div>
    );
}

export default SettingItem;