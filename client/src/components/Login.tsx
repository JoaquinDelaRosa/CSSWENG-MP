import React, { useState } from 'react';
import { createAPIEndpoint, ENDPOINTS, updateToken } from '../api';
import '../style/LoginFull.css';
import '../style/LoginDiv.css';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../api/routes';

type LoginState = {
    username: string
    password: string
};

const Login = () => {
    const [state, setState] = useState<LoginState>({
        username: "",
        password: ""
    });
    
    const navigation = useNavigate();


    const onSubmit = (event: React.SyntheticEvent<HTMLInputElement>) => {
        createAPIEndpoint(ENDPOINTS.login).post(state)
            .then((response: any) => {
                console.log(response.data.split("\""));
                updateToken(response.data.split("\"")[0]);
            })
            .then(() => {
                navigation(ROUTES.orders);
            })
            .catch((err: any) => {
                console.log(err);
            });
        event.preventDefault();
    };

    const onInputChange = (name : string, value : any) => {
        setState(values => ({ ...values, [name]: value }));
    }

    return (
        <div className="FullPage" >
            <div className="loginBox">
                <div className="loginLogo">
                </div>
                <div className="rightBG">
                </div>
                <div className="loginForm">
                    <form className="loginUI">
                        <span>
                            <input className="textField usernameField"
                                name="username"
                                value={state.username}
                                placeholder="Username"
                                onChange={(e) => { onInputChange("username", e.target.value); }} />
                            <br />
                            <br />
                        </span>
                        <span>
                            <input className="textField passwordField"
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={state.password}
                                onChange={(e) => { onInputChange("password", e.target.value); }} />
                            <br />
                            <br />
                        </span>
                        <span>
                            <input className="loginButton"
                                type='button' name="submit" onClick={onSubmit} value={"Sign In"} />
                        </span>
                        <p >Don't have an account? 
                                &nbsp;
                            <span className="redDialogue">
                                <Link to= {ROUTES.register}>
                                 Sign up now.
                                 </Link>
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;