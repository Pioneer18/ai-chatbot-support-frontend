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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
    
        if (newPassword !== confirmPassword) {
            setError('New passwords do not match');
            return;
        }

        const payload = {
            originalPassword: oldPassword,
            newPassword,
            confirmPassword
        }
        
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/change-password`, {
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
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unexpected error occurred');
            }
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