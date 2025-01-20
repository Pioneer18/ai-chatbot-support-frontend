"use client"
import { useState } from "react"
import './login.component.css'
import AuthUtils from "../utilities/utilities";

const LoginComponent = () => {
    const [email, setEmail] = useState('');   
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const handleSubmit = async (e: any) => {
        e?.preventDefault();


        const payload = {
            email: email,
            password: password,
        };
        console.log(`Payload: ${JSON.stringify(payload)}`)

        try {
            AuthUtils.validateEmail(email);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            console.log('POST request sent');
            console.log(response);

            if(!response.ok) {
                throw new Error('Failed to login'); // should be the error from the server
            }

            alert('Should now be redirected to dashboard')
        } catch(err: any) {
            setError(err.message)       
        }
        
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="title">
                    <h1>Login</h1>
                </div>
                <div className="form-field-container">
                    <label className="form-field">Email</label>
                    <input 
                        className="input"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-field-container">    
                    <label className="form-field">Password</label>
                    <input 
                        className="input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div>    
                    <button type="submit">Submit</button>
                </div>
            </form>
        </>
    );
};


export default LoginComponent;