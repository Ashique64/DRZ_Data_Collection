import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login.Jsx";
import Home from "./pages/Home/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Form from "./pages/Form/Form";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/form/:token" element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;
