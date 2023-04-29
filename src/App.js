import React, {useState} from 'react';
import Navigation from './components/Navigation';
import PageContent from "./pages/PageContent";
import ImagesPage from "./pages/ImagesPage";
import {NavigationContext, SelectionContext} from "./Contexts";

function App() {
    // useState calls constructor in params => wrapper for type
    const [activePage, setActivePage] = useState({ctor: ImagesPage});
    const [activeAlbum, setActiveAlbum] = useState(undefined);
    const [selectionMode, setSelectionMode] = useState(false);
    const [selection, setSelection] = useState([]);

    return (
        <div className="container-fluid">
            <NavigationContext.Provider value={{
                activePage, setActivePage,
                activeAlbum, setActiveAlbum,
            }}>
                <SelectionContext.Provider value={{
                    selectionMode, setSelectionMode,
                    selection, setSelection
                }}>
                    <Navigation/>
                    <hr/>
                    <PageContent/>
                </SelectionContext.Provider>
            </NavigationContext.Provider>
        </div>
    );
}


export default App;
