import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../api/routes';
import { createAPIEndpoint } from '../api';
import { LeftImage, RegisterDiv, SignBox, SignPage, SignUp } from '../style/SignStyle';
import { RedDialogue } from '../style/Dialogue';
import { ENDPOINTS } from '../api/endpoints';

interface RegistrationState {
    username: string,
    password: string,
    new_password: string,
    firstName: string,
    lastName: string
}


const Register = () => {
    const [formState, setFormState] = useState<RegistrationState>({
        username: "",
        password: "",
        new_password: "",
        firstName: "",
        lastName: ""
    });

    const navigation = useNavigate();
    const onInputChange = (name: string, value: any) => {
        setFormState(values => ({ ...values, [name]: value }));
    }


    const onSubmit = (event: React.SyntheticEvent<HTMLInputElement>) => {
        if(formState.password !== formState.new_password)
            return;
        
        if (formState.username === "" || formState.firstName === ""  || formState.lastName === "" || formState.password === "")
            return;
            
        event.preventDefault();
        createAPIEndpoint(ENDPOINTS.register).post(formState)
            .then(function (response) {
                navigation(ROUTES.login);
            })
            .catch(function (error) {
                console.log(error);
            })
    };

    return (
        <SignPage>
            <SignBox>
                <LeftImage/>
                <div className='RegistLogo'/>
                <RegisterDiv>
                    <form autoComplete="off">
                        <span>
                            <input type="text"
                                name="firstName"
                                placeholder="First Name"
                                onChange={(e) => { onInputChange("firstName", e.target.value); }} />

                            <input type="text"
                                name="lastName"
                                placeholder="Last Name"
                                onChange={(e) => { onInputChange("lastName", e.target.value); }} />
                            <br />
                        </span>

                        <input type="text"
                            name="username"
                            placeholder="Username"
                            onChange={(e) => { onInputChange("username", e.target.value); }} />
                        <br />

                        <input type="password"
                            name="password"
                            placeholder="Password"
                            onChange={(e) => { onInputChange("password", e.target.value); }} />
                        <br />

                        <input type="password"
                            name="new_password"
                            placeholder="Confirm Password"
                            onChange={(e) => { onInputChange("new_password", e.target.value); }} />
                        <br />

                        <input type='button'
                            name="submit"
                            onClick={onSubmit}
                            value={"Sign Up"} />

                        <SignUp>
                            <p>
                                Already have an account? &nbsp;
                                <span>
                                    <Link to={ROUTES.login}>
                                        <RedDialogue>
                                            Login here
                                        </RedDialogue>
                                    </Link>
                                </span>
                            </p>
                        </SignUp>
                    </form>
                    
                </RegisterDiv>
            </SignBox>
        </SignPage>
          
    );
}

export default Register;