import * as React from 'react';
import {useCallback, useContext} from 'react';
import {Context} from "../App";

function NavItem({children, page}) {
    const {activePage, setActivePage} = useContext(Context);
    const onClick = useCallback(() => {
        setActivePage({ctor: page})
    }, [page, setActivePage]);
    const disabledOrEmpty = page === activePage.ctor ? 'disabled' : '';

    return (
        <button className={`nav-link ${disabledOrEmpty} transparentButton`} onClick={onClick}>
            {children}
        </button>
    );
}

export default NavItem;