import LoginForm from './components/LoginForm';
import { ToastContainer } from '@/components/ui/Toast';
import { IconPeixe30 } from '@/components';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Logo e título */}
        <div className="text-center">
           <div className='flex justify-center'> <IconPeixe30 color="white" /></div>
        </div>

        {/* Formulário de login */}
        <LoginForm />
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}
