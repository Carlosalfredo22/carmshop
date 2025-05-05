import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/login";
import RequireAuth from "./components/RequireAuth";
import Categorias from "./pages/Categorias";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login es público */}
        <Route path="/login" element={<Login />} />

        {/* Las siguientes rutas están protegidas */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/about"
          element={
            <RequireAuth>
              <About />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
      </Routes>
      <Route
        path="/categorias"
        element={
          <RequireAuth>
            <Categorias />
          </RequireAuth>
        }
      />
    </BrowserRouter>
  );
}

export default App;
