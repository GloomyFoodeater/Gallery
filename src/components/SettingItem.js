import * as React from 'react';

function SettingItem({name, alt, hidden, onClick}) {

    return (<button className={`transparentButton ${hidden ? 'hidden' : ''}`}>
        <img
            src={require(`./../../icons/${name}.png`)}
            alt={alt}
            onClick={onClick}
            className="icon"/>
    </button>);
}

export default SettingItem;