import * as React from 'react';
import {useCallback, useContext} from 'react';
import {Context} from "../App";

function NavItem({children, page}) {
    const {activePage, setActivePage} = useContext(Context);
    const disabledClass = page === activePage.ctor ? 'disabled' : '';
    const onClick = useCallback(() => setActivePage({ctor: page}), [page, setActivePage]);
    return (
        <button className={`nav-link ${disabledClass} transparentButton`} onClick={onClick}>
            {children}
        </button>
    );
}

export default NavItem;