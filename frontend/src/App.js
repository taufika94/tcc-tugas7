import {BrowserRouter, Routes, Route} from "react-router-dom";
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <ProtectedRoute>
              <NotesList/>
            </ProtectedRoute>
          }/>
          <Route path="add" element={
            <ProtectedRoute>
              <AddNotes/>
            </ProtectedRoute>
          }/>
          <Route path="edit/:id" element={
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