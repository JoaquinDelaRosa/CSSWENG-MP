import React, { useState } from 'react';
import { createAPIEndpoint, ENDPOINTS} from '../api';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../api/routes';
import { removeRole, setRole } from '../utils/CheckRole';
import { LoginBox, LoginDiv, LoginPage, RightImage, SignUp } from '../style/LoginStyle';
import { RedDialogue } from '../style/Dialogue';


type LoginState = {
    username: string
    password: string
};

const Login = (props: {setIsLoggedIn : Function}) => {
    const [state, setState] = useState<LoginState>({
        username: "",
        password: ""
    });
    
    const navigation = useNavigate();


    const onSubmit = (event: React.SyntheticEvent<HTMLInputElement>) => {
        createAPIEndpoint(ENDPOINTS.login).post(state)
            .then((response) => {
                navigation(ROUTES.orders);
                if(response.data.auth) {
                    props.setIsLoggedIn(true);
                    sessionStorage.setItem("isLoggedIn", "true");
                    setRole(response.data.token);
                }
                else {
                    props.setIsLoggedIn(false);
                    sessionStorage.setItem("isLoggedIn", "false");
                    removeRole();
                }
                
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
        <LoginPage>
            <LoginBox>
                <div className='LoginLogo'></div>
                <RightImage></RightImage>
                <LoginDiv>
                    <form autoComplete="off">
                        <span>
                            <input
                                name="username"
                                value={state.username}
                                placeholder="Username"
                                onChange={(e) => { onInputChange("username", e.target.value); }} />
                            <br />
                            <br />
                        </span>
                        <span>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={state.password}
                                onChange={(e) => { onInputChange("password", e.target.value); }} />
                            <br />
                            <br />
                        </span>
                        <span>
                            <input
                                type='button' name="submit" onClick={onSubmit} value={"Sign In"} />
                        </span>
                        <SignUp>
                        <p >Don't have an account? 
                                &nbsp;
                            <span>
                                <Link to= {ROUTES.register}>
                                 <RedDialogue>Sign up now.</RedDialogue>
                                </Link>
                            </span>
                        </p>
                        </SignUp>
                    </form>
                </LoginDiv>
            </LoginBox>
        </LoginPage>
    );
}

export default Login;