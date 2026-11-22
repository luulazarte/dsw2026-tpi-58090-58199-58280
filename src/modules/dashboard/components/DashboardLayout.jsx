import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from '../../auth/hook/useAuth';
import useLogout from '../../auth/hook/useLogout';
import AdminSidebar from './AdminSidebar';
import AdminMobileHeader from './AdminMobileHeader';

function DashboardLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const logout = useLogout('/admin/login');

  return (
    <div className="min-h-screen bg-med-bg flex">
      <AdminSidebar
        isOpen={isMenuOpen}
        userEmail={user?.email}
        onNavigate={() => setIsMenuOpen(false)}
        onLogout={logout}
      />

      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-slate-900/40 z-30 sm:hidden"
        />
      )}

      <div className="flex-1 flex flex-col min-w-0 sm:pl-64">
        <AdminMobileHeader
          onToggleMenu={() => setIsMenuOpen((open) => !open)}
        />

        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
