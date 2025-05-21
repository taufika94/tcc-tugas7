import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link from react-router-dom
import styled from 'styled-components';
import api from "../api"; // Use the api instance

const FormContainer = styled.div`
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-top: 20px;
`;

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State for error messages
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Send registration data to the backend
            const response = await api.post(`/register`, {
                name,
                email,
                gender,
                password
            });
            // If registration is successful, redirect to the notes page
            if (response.status === 201) {
                navigate("/"); // Redirect to notes page after successful registration
            }
        } catch (error) {
            // Handle errors and set error message
            setError("Registration failed. Please try again.");
            console.error("Registration error:", error);
        }
    };

    return (
        <FormContainer>
            <form onSubmit={handleRegister}>
                {error && <div className="notification is-danger">{error}</div>} {/* Display error message */}
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' required />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Gender</label>
                    <div className="control">
                        <input type="text" className="input" value={gender} onChange={(e) => setGender(e.target.value)} placeholder='Gender' required />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
                    </div>
                </div>
                <div className="field">
                    <button type="submit" className="button is-success">Register</button>
                </div>
            </form>
            <p className="has-text-centered">
                Already have an account? <Link to="/login">Login here</Link> 
            </p>
        </FormContainer>
    );
};

export default Register;
