import React, { useEffect, useState } from 'react';
import { createAPIEndpoint, ENDPOINTS } from '../api';

interface RegistrationState {
    username: string,
    password: string,
    firstName: string,
    lastName: string
}


const RegisterUser = () => {
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
        <div>
            <p> Register </p>
            <form>
                <label>First Name</label>
                <input type="text"
                    name="firstName"
                    onChange={(e) => { onInputChange("firstName", e.target.value); }} />
                <br />

                <label>Last Name</label>
                <input type="text"
                    name="lastName"
                    onChange={(e) => { onInputChange("lastName", e.target.value); }} />
                <br />

                <label>Username</label>
                <input type="text"
                    name="username"
                    onChange={(e) => { onInputChange("username", e.target.value); }} />
                <br />

                <label>Password</label>
                <input type="password"
                    name="password"
                    onChange={(e) => { onInputChange("password", e.target.value); }} />
                <br />

                <input type='button'
                    name="submit"
                    onClick={onSubmit}
                    value={"submit"} />
            </form>
        </div>  
    );
}

export default RegisterUser;