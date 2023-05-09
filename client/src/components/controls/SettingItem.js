import * as React from 'react';

function SettingItem({name, alt, hidden, onClick}) {
    return (
        <button className={`itemName ${hidden ? 'hidden' : ''}`}
                onClick={onClick}>
            <img
                src={require(`./../../icons/${name}.png`)}
                alt={alt}
                className="icon"/>
        </button>
    );
}

export default SettingItem;