"use client"
import { Dispatch, SetStateAction } from "react";
import './auth.form-component.css';

type FieldConfig = {
    name: string;
    label: string;
    type: string;
}

type AuthFormComponentProps = {
    title: string;
    fields: FieldConfig[];
    values: Record<string, string>;
    onChange: (name: string, value: string) => void;
    onSubmit: (values: Record<string, string>) => Promise<void>;
    setError:  Dispatch<SetStateAction<string>>
    error: string
}

const AuthFormComponent = ({ title, fields, values, onChange, onSubmit, setError, error}: AuthFormComponentProps) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        onChange(id, value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await onSubmit(values);
        } catch(err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred');
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="title">
                <h1>{title}</h1>
            </div>
            {fields.map((field) => (
                <div key={field.name} className="form-field-container">
                    <label htmlFor={field.name} className="form-field">
                        {field.label}
                    </label>
                    <input
                        id={field.name}
                        className="input"
                        type={field.type}
                        value={values[field.name]}
                        onChange={handleChange}
                    />
                </div>
            ))}
            {error && <p style={{ color: "red"}}>{error}</p>}
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

export default AuthFormComponent;