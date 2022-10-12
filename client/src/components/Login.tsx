import React, { useEffect, useState } from 'react';
import { createAPIEndpoint, ENDPOINTS } from '../api';
import '../style/LoginFull.css';
import '../style/LoginDiv.css';

type LoginState = {
    username: string
    password: string
};

const Login = () => {
    const [state, setState] = useState<LoginState>({
        username: "",
        password: ""
    });

    const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            username: event.target.value,
            password: state.password
        });
    };

    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            username: state.username,
            password: event.target.value
        })
    };

    const onSubmit = (event: React.SyntheticEvent<HTMLInputElement>) => {
        createAPIEndpoint(ENDPOINTS.login).post(state)
            .then((response: any) => {
                console.log(response?.data);
            })
            .catch((err: any) => {
                console.log(err);
            });
        event.preventDefault();
    };

    return (
        <div className="FullPage">
            <div className="loginUI">
                <h2>Insert Logo Here</h2>
                <span>
                    <input className="textField usernameField"
                        name="username" value={state.username} onChange={onUsernameChange} /> <br /><br />
                </span>

                <span>
                    <input className="textField"
                        type="password" name="password" value={state.password} onChange={onPasswordChange} /> <br /><br />
                </span>

                <span>
                    <input className="loginButton"
                        type='button' name="submit" onClick={onSubmit} value={"Sign In"} />
                </span>

                <span className="redDialogue">
                    <p >Extra Message Popup</p>
                </span>
            </div>
        </div>
    );
}

export default Login;