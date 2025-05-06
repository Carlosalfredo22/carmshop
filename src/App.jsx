import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/login";
import RequireAuth from "./components/RequireAuth";
import Categorias from "./pages/Categorias";
import Productos from "./pages/Productos";
import MetodosPago from './pages/MetodosPago'; 
import Pagos from './pages/Pagos';
import Pedidos from './pages/Pedidos';


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
        <Route
          path="/categorias"
          element={
            <RequireAuth>
              <Categorias />
            </RequireAuth>
          }
        />
        <Route
          path="/productos"
          element={
            <RequireAuth>
              <Productos />
            </RequireAuth>
          }
        />
        <Route
          path="/metodos-pago"
          element={
        <RequireAuth>
        <MetodosPago />
        </RequireAuth>
          }
        />
        <Route
           path="/pagos"
           element={
          <RequireAuth>
           <Pagos />
          </RequireAuth>
          }
        />
        <Route
          path="/pedidos"
          element={
            <RequireAuth>
              <Pedidos />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}



export default App;
