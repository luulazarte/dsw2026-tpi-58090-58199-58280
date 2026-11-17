import { createContext, useState } from 'react';
import { loginAdmin, loginPatient } from '../services/authService';
import { ROLES } from '../constants/roles';
import {
  clearSession,
  getSession,
  saveSession,
} from '../../shared/helpers/session';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [session, setSession] = useState(() => getSession());
   const startSession = (newSession) => {
    saveSession(newSession);
    setSession(newSession);
  };  

  const signInAdmin = async (email, password) => {
    const { data, error } = await loginAdmin(email, password);

    if (error) {
      return { error };
    }

    if (data.role !== ROLES.ADMIN) {
      return { error: 'El usuario no tiene permisos de administrador.' };
    }

    startSession({ token: data.token, role: data.role, email });

    return { error: null };
  };

  const signInPatient = async (email, dni) => {
    const { data, error } = await loginPatient(email, dni);

    if (error) {
      return { error };
    }

    // Guardamos el DNI porque el token no lo trae y los endpoints de
    // turnos del paciente lo necesitan (GET /api/appointments/patient?dni=)
    startSession({ token: data.token, role: data.role, email, dni });

    return { error: null };
  };

  const signOut = () => {
    clearSession();
    setSession(null);
  };

  return (
    <AuthContext.Provider
       value={{
        isAuthenticated: Boolean(session?.token),
        role: session?.role ?? null,
        user: session ? { email: session.email, dni: session.dni } : null,
        signInAdmin,
        signInPatient,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
