import * as React from 'react';
import {useContext} from 'react';
import NavItem from "../controls/NavItem";
import ImagePage from "../pages/ImagePage";
import AlbumPage from "../pages/AlbumPage";
import {NavigationContext} from "../../Contexts";
import CurrentAlbumPage from "../pages/CurrentAlbumPage";


function NavBar() {
    const {activeAlbum} = useContext(NavigationContext);
    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="nav nav-pills me-auto">
                    <NavItem page={ImagePage}>Все изображения</NavItem>
                    <NavItem page={AlbumPage}>Альбомы</NavItem>
                    {activeAlbum && (
                        <NavItem page={CurrentAlbumPage}>{activeAlbum.name}</NavItem>)
                    }
                </div>
            </div>
        </nav>
    );
}

export default NavBar;