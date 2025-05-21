import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
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

const EditNotes = () => {
    const[judul,setJudul] = useState("");
    const[content,setContent] = useState("");
    const navigate = useNavigate();
    const{id} = useParams () ;

    useEffect (() => {
        getNotesById();
    }, []);

    const updateNotes = async (e) => {
        e.preventDefault () ;
        try{
            await api.patch(`${BASE_URL}/notes/${id}`, {
                judul,
                content,
            });
            navigate("/notes");
        } catch (error) {
            console.log(error);

        };
    };

    const getNotesById = async () => {
        const response = await api.get(`${BASE_URL}/notes/${id}`);
        setJudul(response.data.judul);
        setContent(response.data.content);
    };

    return (
        <FormContainer>
            <form onSubmit={updateNotes}>
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
                    <button type="submit" className="button is-success">Update</button>
                </div>
            </form>
        </FormContainer>
    );
};

export default EditNotes;