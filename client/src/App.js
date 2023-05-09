import React, {useEffect, useState} from 'react';
import NavBar from './components/bars/NavBar';
import PageContent from "./components/containers/PageContent";
import ImagePage from "./components/pages/ImagePage";
import {NavigationContext, SelectionContext, UserContext} from "./Contexts";
import {doesHttpOnlyCookieExist} from "./utils/cookie";
import SignInPage from "./components/pages/SignInPage";

function defaultPage(isAuthorized) {
    return {ctor: isAuthorized ? ImagePage : SignInPage};
}

function App() {
    // useState calls constructor in params => wrapper for type
    const [activeAlbum, setActiveAlbum] = useState(undefined);
    const [selectionMode, setSelectionMode] = useState(false);
    const [selection, setSelection] = useState(new Set());
    const [nextSelectAll, setNextSelectAll] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(doesHttpOnlyCookieExist('token'));
    const [activePage, setActivePage] = useState(defaultPage(isAuthorized));


    const userContext = {
        isAuthorized, setIsAuthorized
    };
    const navigationContext = {
        activePage, setActivePage,
        activeAlbum, setActiveAlbum,
    };
    const selectionContext = {
        selectionMode, setSelectionMode,
        selection, setSelection,
        nextSelectAll, setNextSelectAll
    };

    useEffect(() => {
        setActivePage(defaultPage(isAuthorized));
        if (!isAuthorized) setActiveAlbum(undefined);
    }, [isAuthorized, setActivePage, setActiveAlbum]);

    return (
        <div className="container-fluid">
            <UserContext.Provider value={userContext}>
                <NavigationContext.Provider value={navigationContext}>
                    <NavBar/>
                    <hr/>
                    <SelectionContext.Provider value={selectionContext}>
                        <PageContent/>
                    </SelectionContext.Provider>
                </NavigationContext.Provider>
            </UserContext.Provider>
        </div>
    );
}


export default App;
