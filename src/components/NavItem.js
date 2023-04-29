import * as React from 'react';
import {useCallback, useContext} from 'react';
import {NavigationContext} from "../App";

function NavItem({children, page}) {
    const {activePage, setActivePage, setSelectionMode} = useContext(NavigationContext);
    const onClick = useCallback(() => {
        setActivePage({ctor: page});
        setSelectionMode(false);
    }, [page, setActivePage, setSelectionMode]);
    const disabledOrEmpty = page === activePage.ctor ? 'disabled' : '';

    return (
        <button className={`nav-link ${disabledOrEmpty} transparentButton`} onClick={onClick}>
            {children}
        </button>
    );
}

export default NavItem;