import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import NotesList from "./components/NotesList";
import AddNotes from "./components/AddNotes";
import EditNotes from "./components/EditNotes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GlobalStyles from "./styles/GlobalStyles";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles/>
      <Header/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/notes" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notes" element={
            <ProtectedRoute>
              <NotesList/>
            </ProtectedRoute>
          }/>
          <Route path="/notes/add" element={
            <ProtectedRoute>
              <AddNotes/>
            </ProtectedRoute>
          }/>
          <Route path="/edit/:id" element={
            <ProtectedRoute>
              <EditNotes/>
            </ProtectedRoute>
          }/>
        </Routes>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;