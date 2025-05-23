import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import styled from 'styled-components';
import { BASE_URL } from "../utils";
import api from "../api";

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
      const response = await api.get("/notes"); // BASE_URL sudah di-set di api.js
      setNotes(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/login');
      }
      console.error("Error fetching notes:", error);
    }
  };

  const deleteNotes = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      getNotes(); // Refresh data setelah delete
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

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
          {notes.map((note, index) => (
            <tr key={note.id}>
              <td>{index + 1}</td>
              <td>{note.judul}</td>
              <td>{note.content}</td>
              <td>
                <Link to={`edit/${note.id}`} className="button is-small is-info">
                  <FaEdit />
                </Link>
                <button
                  onClick={() => deleteNotes(note.id)}
                  className="button is-small is-danger"
                >
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
