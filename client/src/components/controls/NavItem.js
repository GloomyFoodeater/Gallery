import * as React from 'react';
import {useCallback, useContext} from 'react';
import {NavigationContext} from "../../Contexts";

function NavItem({children, page}) {
    const {activePage, setActivePage} = useContext(NavigationContext);
    const onClick = useCallback((event) => {
        event.preventDefault();
        setActivePage({ctor: page})
    }, [page]);
    const disabledOrEmpty = page === activePage.ctor ? 'disabled' : '';

    return (
        <a className={`nav-link ${disabledOrEmpty}`} onClick={onClick}>
            {children}
        </a>
    );
}

export default NavItem;