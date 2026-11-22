import useAuth from '../hook/useAuth';
import useLogin from '../hook/useLogin';
import AuthLayout from '../components/AuthLayout';
import PatientLoginForm from '../components/PatientLoginForm';

function PatientLoginPage() {
  const { signInPatient } = useAuth();
  const { login, errorMessage } = useLogin({
    signIn: signInPatient,
    redirectTo: '/',
  });

  return (
    <AuthLayout
      bottomLink={{
        to: '/admin/login',
        label: '¿Es personal administrativo o médico? Ingrese aquí →',
      }}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-white/10 p-6 sm:p-10">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-med-primary-900">
            Portal del Paciente
          </h2>
          <p className="text-xs text-med-text-sub mt-1 leading-relaxed">
            Inicia sesión para reservar y consultar tus turnos médicos
          </p>
        </div>

        <PatientLoginForm
          onSubmit={({ email, dni }) => login(email, dni)}
          errorMessage={errorMessage}
        />
      </div>
    </AuthLayout>
  );
}

export default PatientLoginPage;
