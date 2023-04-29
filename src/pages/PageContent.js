import React, {useContext} from 'react';
import {Context} from "../App";

function PageContent() {
    const {activePage} = useContext(Context);
    return React.createElement(activePage.ctor);
}

export default PageContent;