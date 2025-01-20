"use client"
import { useState } from "react";

const ChangePasswordComponent = () => {
    // state for the fields
    // callback handler for submit to post to backend
    // the form (maybe a generic component?)
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: any) => {
        e?.preventDefault();
        console.log('Submiting the form to the backend...');
        // validate the form data
        if (newPassword !== confirmPassword) {
            setError('New passwords do not match');
            return;
        }
        // init the payload
        const payload = {
            originalPassword: oldPassword,
            newPassword,
            confirmPassword
        }
        // send a post http request and capture the response header and body
        try {
            const response = await fetch('http://localhost:3000/auth/change-password', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Failed to change password'); // should be the error returned from the server
            }

            alert('Password changed succesfully')
        } catch (error: any) {
            setError(error.message)
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="title">
                    <h1>Change Password</h1>
                </div>
                <div className="form-field-container">
                    <label className="form-field">Old password</label>
                    <input 
                        className="input"
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>
                <div className="form-field-container">    
                    <label className="form-field">New password</label>
                    <input 
                        className="input"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className="form-field-container">    
                    <label className="form-field">Confirm new password</label>
                    <input 
                        className="input"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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

export default ChangePasswordComponent;