import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from "axios"; // Tambahkan ini di bagian atas file Header dan NotesList
import { BASE_URL } from "../utils";


const Navbar = styled.nav`
  background-color: #4a90e2;
  padding: 1rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  console.log('Token:', token);

  const handleLogout = async () => {
    try {
      await axios.delete(`${BASE_URL}/logout`, {
        withCredentials: true
      });
      localStorage.removeItem('accessToken');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Navbar>
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <strong>Catatan App</strong>
        </a>
      </div>
      {token && (
        <div className="navbar-item">
          <button onClick={handleLogout} className="button is-light">
            Logout
          </button>
        </div>
      )}
    </Navbar>
  );
};

export default Header;