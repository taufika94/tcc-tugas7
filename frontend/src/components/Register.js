import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { BASE_URL } from "../utils";

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
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${BASE_URL}/register`, {
                name,
                email,
                gender,
                password
            });
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <FormContainer>
            <form onSubmit={handleRegister}>
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Gender</label>
                    <div className="control">
                        <input type="text" className="input" value={gender} onChange={(e) => setGender(e.target.value)} placeholder='Gender' />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                    </div>
                </div>
                <div className="field">
                    <button type="submit" className="button is-success">Register</button>
                </div>
            </form>
        </FormContainer>
    );
};

export default Register;
