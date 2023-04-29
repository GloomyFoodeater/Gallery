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
                    <NavBar/>
                    <hr/>
                    <PageContent/>
                </SelectionContext.Provider>
            </NavigationContext.Provider>
        </div>
    );
}


export default App;
