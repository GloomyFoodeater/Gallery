import React, {useContext} from 'react';
import {NavigationContext} from "../App";

function PageContent() {
    const {activePage} = useContext(NavigationContext);
    return React.createElement(activePage.ctor);
}

export default PageContent;