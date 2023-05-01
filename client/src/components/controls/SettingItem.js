import * as React from 'react';

function SettingItem({name, alt, hidden, onClick}) {
    return (
        <span className={`itemName ${hidden ? 'hidden' : ''}`}>
            <img
                src={require(`./../../icons/${name}.png`)}
                alt={alt}
                onClick={onClick}
                className="icon"/>
        </span>
    );
}

export default SettingItem;