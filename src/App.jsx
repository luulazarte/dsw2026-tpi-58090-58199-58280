import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { AuthProvider } from './modules/auth/context/AuthProvider';
import ProtectedRoute from './modules/auth/components/ProtectedRoute';
import { ROLES } from './modules/auth/constants/roles';


import AdminLoginPage from './modules/auth/pages/AdminLoginPage';


import PatientLoginPage from './modules/patients/pages/PatientLoginPage';
import PatientLayout from './modules/patients/components/PatientLayout';
import PatientHome from './modules/patients/pages/PatientHome';
import AppointmentsPage from './modules/patients/pages/AppointmentsPage';


import DashboardLayout from './modules/dashboard/components/DashboardLayout';
import OverviewPage from './modules/dashboard/pages/OverviewPage';


import DoctorsPage from './modules/doctors/pages/DoctorsPage';
import SpecialtiesPage from './modules/specialties/pages/SpecialtiesPage';
import SpecialtyFormPage from './modules/specialties/pages/SpecialtyFormPage';
import AppointmentsSearchPage from './modules/appointments/pages/AppointmentsSearchPage';

const routes = [

  {
    path: '/login',
    element: <PatientLoginPage />,
  },
  {
    path: '/admin/login',
    element: <AdminLoginPage />,
  },


  {
    path: '/',
    element: (
      <ProtectedRoute role={ROLES.PATIENT} redirectTo="/login">
        <PatientLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <PatientHome />,
      },
      {
        path: 'appointments',
        element: <AppointmentsPage />,
      },
    ],
  },


  {
    path: '/admin',
    element: (
      <ProtectedRoute role={ROLES.ADMIN} redirectTo="/admin/login">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/admin/home" replace />,
      },
      {
        path: 'home',
        element: <OverviewPage />,
      },
      {
        path: 'patients',
        element: <AppointmentsSearchPage />,
      },
      {
        path: 'patient-search',
        element: <AppointmentsSearchPage />,
      },
      {
        path: 'appointments',
        element: <Navigate to="/admin/patients" replace />,
      },
      {
        path: 'specialties',
        element: <SpecialtiesPage />,
      },
      {
        path: 'specialties/new',
        element: <SpecialtyFormPage />,
      },
      {
        path: 'doctors',
        element: <DoctorsPage />,
      },
    ],
  },

  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];

function App() {
  const router = createBrowserRouter(routes);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;