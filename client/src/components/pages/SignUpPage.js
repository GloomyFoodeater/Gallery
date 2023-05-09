import React, {useCallback, useContext, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {signUp} from "../../api/rest";
import {UserContext} from "../../Contexts";

function SignUpPage() {
    const {setIsAuthorized} = useContext(UserContext);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const onClick = useCallback(() => {
        signUp({login, password}).then(() => {
            setIsAuthorized(true);
        }).catch(e => alert(e));
    }, [login, password, setIsAuthorized]);
    return (
        <div style={{margin: "auto", width: "50%", textAlign: "center"}}>
            <Form>
                <Form.Group className="mb-4">
                    <Form.Control
                        type="text"
                        placeholder="Логин"
                        value={login}
                        onChange={(({target: {value}}) => setLogin(value))}/>
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Control
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={({target: {value}}) => setPassword(value)}/>
                </Form.Group>
                <Button variant="primary" onClick={onClick}>
                    Регистрация
                </Button>
            </Form>
        </div>
    );
}

export default SignUpPage;