import React, { useState } from 'react';
import '../style/RegistFull.css';
import '../style/RegistDiv.css';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../api/routes';
import { createAPIEndpoint, ENDPOINTS } from '../api';

interface RegistrationState {
    username: string,
    password: string,
    firstName: string,
    lastName: string
}


const Register = () => {
    const [formState, setFormState] = useState<RegistrationState>({
        username: "",
        password: "",
        firstName: "",
        lastName: ""
    });

    const onInputChange = (name: string, value: any) => {
        setFormState(values => ({ ...values, [name]: value }));
    }


    const onSubmit = (event: React.SyntheticEvent<HTMLInputElement>) => {
        console.log(formState)
        event.preventDefault();
        createAPIEndpoint(ENDPOINTS.register).post(formState)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    };

    return (
        <div className="FullPage">
            <div className="registerBox">
                <div className="leftBG">
                </div>
                <div className="registLogo">
                </div>
                <div className="registerForm">
                    <form className="registerUI">
                        <span className="customerName">
                            <input type="text" className="firstName"
                                name="firstName"
                                placeholder="First Name"
                                onChange={(e) => { onInputChange("firstName", e.target.value); }} />

                            <input type="text" className="lastName"
                                name="lastName"
                                placeholder="Last Name"
                                onChange={(e) => { onInputChange("lastName", e.target.value); }} />
                            <br />
                        </span>

                        <input type="text" className="textField usernameField"
                            name="username"
                            placeholder="Username"
                            onChange={(e) => { onInputChange("username", e.target.value); }} />
                        <br />

                        <input type="password" className="textField passwordField"
                            name="password"
                            placeholder="Password"
                            onChange={(e) => { onInputChange("password", e.target.value); }} />
                        <br />

                        <input type="password" className="textField passwordField"
                            name="new_password"
                            placeholder="Confirm Password"
                            onChange={(e) => { onInputChange("new_password", e.target.value); }} />
                        <br />

                        <input type='button' className="registButton"
                            name="submit"
                            onClick={onSubmit}
                            value={"SIGN UP"} />
                    </form>
                    <p className="loginDial">Already have an account? &nbsp;<span className="redDialogue"><Link to={ROUTES.login}>
                        Login here.</Link></span></p>
                </div>
            </div>
        </div>
          
    );
}

export default Register;