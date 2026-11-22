import useAuth from '../hook/useAuth';
import useLogin from '../hook/useLogin';
import AuthLayout from '../components/AuthLayout';
import AdminLoginForm from '../components/AdminLoginForm';
import { ShieldIcon } from '../../shared/components/icons';

function AdminLoginPage() {
  const { signInAdmin } = useAuth();
  const { login, errorMessage } = useLogin({
    signIn: signInAdmin,
    redirectTo: '/admin/home',
  });

  return (
    <AuthLayout
      bottomLink={{ to: '/login', label: '← Volver al Portal de Pacientes' }}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/10">
        <div className="p-8 sm:p-10">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-med-primary-900">
              Bienvenido de nuevo
            </h2>
            <p className="text-xs text-med-text-sub mt-1 leading-relaxed">
              Por favor, autentíquese para acceder al portal de proveedores.
            </p>
          </div>

          <AdminLoginForm
            onSubmit={({ email, password }) => login(email, password)}
            errorMessage={errorMessage}
          />
        </div>

        <div className="bg-med-primary-50 border-t border-med-primary-100 p-4 sm:p-5 flex items-start gap-3">
          <ShieldIcon className="w-5 h-5 text-med-primary-600 shrink-0 mt-0.5" />
          <p className="text-xs text-med-text-sub leading-relaxed">
            <strong className="text-med-text-main font-semibold">
              Solo Acceso Seguro:
            </strong>{' '}
            Este sistema es para personal médico autorizado. Los intentos de
            acceso no autorizados son registrados y monitoreados para su
            cumplimiento.
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}

export default AdminLoginPage;
