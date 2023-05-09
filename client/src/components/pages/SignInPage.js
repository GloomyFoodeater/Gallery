import React, {useCallback, useContext, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {signIn} from "../../api/rest";
import {UserContext} from "../../Contexts";

function SignInPage() {
    const {setIsAuthorized} = useContext(UserContext);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const onClick = useCallback(() => {
        signIn(login, password).then(() => {
            setIsAuthorized(true);
        }).catch(e => alert(e));
    }, [login, password, signIn]);
    return (
        <div style={{margin: "auto", width: "50%", textAlign: "center"}}>
            <Form>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Control
                        type="text"
                        placeholder="Логин"
                        value={login}
                        onChange={(({target: {value}}) => setLogin(value))}/>
                </Form.Group>
                <Form.Group className="mb-4" controlId="formBasicPassword">
                    <Form.Control
                        type="password"
                        placeholder="Пароль"
                        onChange={({target: {value}}) => setPassword(value)}/>
                </Form.Group>
                <Button variant="primary" onClick={onClick}>
                    Вход
                </Button>
            </Form>
        </div>
    );
}

export default SignInPage;