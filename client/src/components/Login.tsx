import React, { useEffect, useState } from 'react';
import { createAPIEndpoint, ENDPOINTS } from '../api';

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

    const onSubmit = (event: React.FormEvent<HTMLInputElement>) => {
        createAPIEndpoint(ENDPOINTS.login).fetch();
        event.preventDefault();
    };

    return (
        <div>
            <span>
                <p> Username </p>
                <input type='text' name="username" value={state.username} onChange={onUsernameChange} /> <br />
            </span>

            <span>
                <p> Password </p>
                <input type="password" name="password" value={state.password} onChange={onPasswordChange} /> <br />
            </span>

            <span>
                <input type='submit' name="submit" onClick={onSubmit} value={"submit"} />
            </span>
        </div>
    );
}

export default Login;