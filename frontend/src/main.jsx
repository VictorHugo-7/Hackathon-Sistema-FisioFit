import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import './index.css'
import Login from './pages/Login.jsx'       
import Cadastro from './pages/Cadastro.jsx' 
import Sistema from './pages/Sistema.jsx'   
import ProtectedRoute from './components/ProtectedRoute.jsx' 

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />, 
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
  },
  {
    path: "/sistema",
    element: (
      <ProtectedRoute>
        <Sistema />
      </ProtectedRoute>
    )
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)