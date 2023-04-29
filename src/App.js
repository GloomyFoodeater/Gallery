import * as React from 'react';
import {createContext, useState} from 'react';
import Navigation from './components/Navigation';
import PageContent from "./pages/PageContent";
import ImagesPage from "./pages/ImagesPage";

export const Context = createContext(null);

function App() {
    // useState calls constructor in params => wrapper for type
    const [activePage, setActivePage] = useState({ctor: ImagesPage});
    const [activeAlbum, setActiveAlbum] = useState(undefined);

    return (
        <Context.Provider value={{activePage, setActivePage, activeAlbum, setActiveAlbum}}>
            <Navigation/>
            <hr/>
            <PageContent/>
        </Context.Provider>
    );
}


export default App;
