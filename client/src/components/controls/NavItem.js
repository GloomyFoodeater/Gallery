import * as React from 'react';
import {useCallback, useContext} from 'react';
import {NavigationContext, SelectionContext} from "../../Contexts";

function NavItem({children, page}) {
    const {setSelectionMode} = useContext(SelectionContext);
    const {activePage, setActivePage} = useContext(NavigationContext);

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