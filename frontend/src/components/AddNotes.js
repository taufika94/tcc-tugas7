import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import styled from 'styled-components';
import { BASE_URL } from "../utils";
import api from "../api"

const FormContainer = styled.div`
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-top: 20px;
`;

const AddNotes = () => {
    const [judul, setJudul] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const saveNotes = async (e) => {
        e.preventDefault () ;
        try{
            await api.post(`${BASE_URL}/notes/add`, {
                judul,
                content
            });
            navigate("/notes");
        } catch (error) {
            console.log(error);

        };
    };


    return (
        <FormContainer>
            <form onSubmit={saveNotes}>
                <div className="field">
                    <label className="label">Judul</label>
                    <div className="control">
                        <input type="text" className="input" value={judul} onChange={(e) => setJudul(e.target.value)} placeholder='Judul' />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Content</label>
                    <div className="control">
                        <input type="text" className="input" value={content} onChange={(e) => setContent(e.target.value)} placeholder='Content' />
                    </div>
                </div>
                <div className="field">
                    <button type="submit" className="button is-success">Save</button>
                </div>
            </form>
        </FormContainer>
    );
};

export default AddNotes;