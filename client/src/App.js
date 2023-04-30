import React, {useState} from 'react';
import NavBar from './components/bars/NavBar';
import PageContent from "./components/containers/PageContent";
import ImagePage from "./components/pages/ImagePage";
import {NavigationContext, SelectionContext} from "./Contexts";

function App() {
    // useState calls constructor in params => wrapper for type
    const [activePage, setActivePage] = useState({ctor: ImagePage});
    const [activeAlbum, setActiveAlbum] = useState(undefined);
    const [selectionMode, setSelectionMode] = useState(false);
    const [selection, setSelection] = useState(new Set());
    const [nextSelectAll, setNextSelectAll] = useState(true);

    const navigationContext = {
        activePage, setActivePage,
        activeAlbum, setActiveAlbum,
    };
    const selectionContext = {
        selectionMode, setSelectionMode,
        selection, setSelection,
        nextSelectAll, setNextSelectAll
    };

    return (
        <div className="container-fluid">
            <NavigationContext.Provider value={navigationContext}>
                <NavBar/>
                <hr/>
                <SelectionContext.Provider value={selectionContext}>
                    <PageContent/>
                </SelectionContext.Provider>
            </NavigationContext.Provider>
        </div>
    );
}


export default App;
