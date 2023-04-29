import * as React from 'react';
import {useContext} from 'react';
import NavItem from "./NavItem";
import ImagesPage from "../pages/ImagesPage";
import AlbumsPage from "../pages/AlbumsPage";
import {Context} from "../App";
import CurrentAlbumPage from "../pages/CurrentAlbumPage";


function Navigation() {
    const {activeAlbum} = useContext(Context);
    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="nav nav-pills me-auto">
                    <NavItem page={ImagesPage}>Все изображения</NavItem>
                    <NavItem page={AlbumsPage}>Альбомы</NavItem>
                    {activeAlbum && (
                        <NavItem page={CurrentAlbumPage}>{activeAlbum.name}</NavItem>)
                    }
                </div>
            </div>
        </nav>
    );
}

export default Navigation;