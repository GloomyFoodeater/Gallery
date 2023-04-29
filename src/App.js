import React, {createContext, useState} from 'react';
import Navigation from './components/Navigation';
import PageContent from "./pages/PageContent";
import ImagesPage from "./pages/ImagesPage";

export const NavigationContext = createContext(null);

function App() {
    // useState calls constructor in params => wrapper for type
    const [activePage, setActivePage] = useState({ctor: ImagesPage});
    const [activeAlbum, setActiveAlbum] = useState(undefined);
    const [selectionMode, setSelectionMode] = useState(false);

    return (
        <div className="container-fluid">
            <NavigationContext.Provider value={{
                activePage, setActivePage,
                activeAlbum, setActiveAlbum,
                selectionMode, setSelectionMode
            }}>
                <Navigation/>
                <hr/>
                <PageContent/>
            </NavigationContext.Provider>
        </div>
    );
}


export default App;
