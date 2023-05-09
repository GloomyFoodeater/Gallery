import * as React from 'react';
import {useCallback, useContext} from 'react';
import NavItem from "../controls/NavItem";
import ImagePage from "../pages/ImagePage";
import AlbumPage from "../pages/AlbumPage";
import {NavigationContext, UserContext} from "../../Contexts";
import CurrentAlbumPage from "../pages/CurrentAlbumPage";
import SignUpPage from "../pages/SignUpPage";
import SignInPage from "../pages/SignInPage";
import {signOut} from "../../api/current";
import SettingItem from "../controls/SettingItem";

function NavBar() {
    const {activeAlbum} = useContext(NavigationContext);
    const {isAuthorized, setIsAuthorized} = useContext(UserContext);
    const onThen = useCallback(() => setIsAuthorized(false), [setIsAuthorized]);
    const onClick = useCallback(() => signOut({onThen, onCatch: alert}), [onThen]);

    const unAuthorizedPage = (
        <>
            <NavItem page={SignUpPage}>Регистрация</NavItem>
            <NavItem page={SignInPage}>Вход</NavItem>
        </>
    );
    const authorizedPage = (
        <>
            <SettingItem name="logout" alt="Выход" onClick={onClick}/>
            <NavItem page={ImagePage}>Все изображения</NavItem>
            <NavItem page={AlbumPage}>Альбомы</NavItem>
            {activeAlbum && (
                <NavItem page={CurrentAlbumPage}>{activeAlbum.name}</NavItem>)
            }
        </>
    );
    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="nav nav-pills me-auto">
                    {isAuthorized ? <>{authorizedPage}</> : <>{unAuthorizedPage}</>}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;