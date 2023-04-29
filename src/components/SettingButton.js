import * as React from 'react';

function SettingButton({name, alt, hidden, onClick}) {
    const imgStyle = {
        visibility: hidden ? 'hidden' : 'visible', width: '35px', height: '35px'
    };
    const buttonStyle = {
        background: 'transparent', border: 'none', outline: 'none'
    };

    return (<button style={buttonStyle}>
            <img
                src={require(`./../../icons/${name}.png`)}
                alt={alt}
                onClick={onClick}
                style={imgStyle}/>
        </button>);
}

export default SettingButton;