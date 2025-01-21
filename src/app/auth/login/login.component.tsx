"use client";
import AuthUtils from "../utilities/utilities";
import AuthFormComponent from "../common/auth.form-component";
import { useState } from "react";

const LoginComponent = () => {
    const [values, setValues] = useState<Record<string, string>>({
        email: "",
        password: "",
    });
    const [error, setError] = useState<string>("");

    const handleSubmit = async (values: Record<string, string>) => {
        const { email, password } = values;
        AuthUtils.validateEmail(email);

        const payload = { email, password };
    
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if(!response.ok) {
            const errMessage = await response.text();
            console.log('setting the error now: ', errMessage);
            setError(errMessage || 'Login attempt failed: invalid credentials');
            return;
        }
        
        setError('');
        
    };

    const handleChange = (name: string, value: string) => {
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const fields = [
        {
            name: 'email',
            label: 'Email',
            type: 'text',
        },
        {
            name: 'password',
            label: 'Password',
            type: 'password',
        },
    ]

    return (
        <>
            <AuthFormComponent
                title={'Login'}
                fields={fields}
                values={values}
                onChange={handleChange}
                onSubmit={handleSubmit}
                setError={setError}
                error={error}
            />
        </>
    );
};


export default LoginComponent;