import { Outlet } from 'react-router-dom';
import useAuth from '../../auth/hook/useAuth';
import useLogout from '../../auth/hook/useLogout';
import PatientHeader from './PatientHeader';

function PatientLayout() {
  const { user } = useAuth();
  const logout = useLogout('/login');

  return (
    <div className="min-h-screen bg-med-bg flex flex-col">
      <PatientHeader userEmail={user?.email} onLogout={logout} />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default PatientLayout;
