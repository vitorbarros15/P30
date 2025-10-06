'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useAuth, useAuthActions } from '@/core/stores/authStore';
import { useToast } from '@/core/stores/uiStore';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card, { CardHeader, CardContent } from '@/components/ui/Card';
import Loading from '@/components/ui/Loading';
import IconEmail from '@/components/icons/IconEmail';
import IconPassword from '@/components/icons/IconPassword';

// Schema de validação
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const { setError } = useAuthActions();
  const { success, error: toastError } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null);
      await login(data);
      success('Login realizado com sucesso!');
      router.push('/dashboard');
    } catch (error: any) {
      let errorMessage = 'Erro interno. Tente novamente mais tarde.';

      if (error.response?.status === 401) {
        errorMessage = 'Email ou senha incorretos';
      } else if (error.response?.status === 400) {
        errorMessage = 'Dados inválidos. Verifique suas informações.';
      } else if (error.response?.status === 429) {
        errorMessage = 'Muitas tentativas. Tente novamente em alguns minutos.';
      }

      setFormError('root', {
        type: 'manual',
        message: errorMessage,
      });

      toastError('Erro no login', errorMessage);
    }
  };

  const eyeIcon = showPassword ? (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464m1.414 1.414L12 12m-3.122-3.122l4.242 4.242M12 12l1.414-1.414m0 0L16.464 8.464M12 12l-1.414 1.414" />
    </svg>
  ) : (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );

  if (isLoading) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent>
          <Loading size="lg" text="Fazendo login..." />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader
        title="Entre na sua conta"
        subtitle="Digite suas credenciais para acessar o sistema"
      />
      
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="seu@email.com"
              leftIcon={<IconEmail />}
              error={errors.email?.message}
              {...register('email')}
            />

            <div className="relative">
              <Input
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite sua senha"
                leftIcon={<IconPassword />}
                error={errors.password?.message}
                {...register('password')}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {eyeIcon}
              </button>
            </div>
          </div>

          {errors.root && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-600 flex items-center gap-2">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.root.message}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Lembrar de mim
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Esqueceu sua senha?
              </a>
            </div>
          </div>

          <Button
            type="submit"
            loading={isLoading}
            fullWidth
            size="lg"
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
