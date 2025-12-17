import { createBrowserRouter, Navigate } from "react-router-dom";
import { Dashboard, Login, Acervo, Emprestimos, Atrasos, Copia, Register } from "../pages";
import ProtectedRoute from "../components/ProtectedRoute";
import ProtectedLayout from "./ProtectedLayout";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => (
  <ProtectedLayout>{children}</ProtectedLayout>
);

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <LayoutWrapper>
          <Dashboard />
        </LayoutWrapper>
      </ProtectedRoute>
    )
  },
  {
    path: "/acervo",
    element: (
      <ProtectedRoute>
        <LayoutWrapper>
          <Acervo />
        </LayoutWrapper>
      </ProtectedRoute>
    )
  },
  {
    path: "/emprestimos",
    element: (
      <ProtectedRoute>
        <LayoutWrapper>
          <Emprestimos />
        </LayoutWrapper>
      </ProtectedRoute>
    )
  },
  {
    path: "/atrasos",
    element: (
      <ProtectedRoute>
        <LayoutWrapper>
          <Atrasos />
        </LayoutWrapper>
      </ProtectedRoute>
    )
  },
  {
    path: "/copia",
    element: (
      <ProtectedRoute>
        <LayoutWrapper>
          <Copia />
        </LayoutWrapper>
      </ProtectedRoute>
    )
  },
  {
    path: "*",
    element: <Navigate to="/" replace />
  }
]);