import {doesHttpOnlyCookieExist} from "./cookie";

export function resetActivePage(selectionContext, userContext) {
    const {setSelectionMode, setSelection, setNextSelectAll} = selectionContext;
    const {setIsAuthorized} = userContext;
    setSelectionMode(false);
    setSelection(new Set());
    setNextSelectAll(true);
    setIsAuthorized(doesHttpOnlyCookieExist('token'));
    window.scrollTo(0, 0);
}