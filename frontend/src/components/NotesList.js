import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import styled from 'styled-components';
import { BASE_URL } from "../utils";
import api from "../api"
import { useNavigate } from 'react-router-dom'; // Tambahkan ini di bagian atas file NotesList


const TableContainer = styled.div`
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-top: 20px;
`;

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      const response = await api.get(`${BASE_URL}/notes`);
      setNotes(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/login');
      }
    }
  };

    const deleteNotes = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/notes/${id}`);
            getNotes();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TableContainer>
            <Link to={`add`} className="button is-success">Add New</Link>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Judul</th>
                        <th>Content</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {notes.map((notes,index) => (
                    <tr key = {notes.id}>
                        <td>{index + 1}</td>
                        <td>{notes.judul}</td>
                        <td>{notes.content}</td>
                        <td>
                            <Link to={`edit/${notes.id}`} className = "button is small is-info"><FaEdit /></Link>
                            <button onClick={() => deleteNotes(notes.id)} className="button is small is-danger">
                                <FaTrash />
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </TableContainer>
    );
};

export default NotesList;
