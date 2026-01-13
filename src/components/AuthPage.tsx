import { useState } from 'react';
import { UserX } from 'lucide-react';
import { GoogleSignIn } from './GoogleSignIn';

interface AuthPageProps {
  onLogin: (username: string, email?: string, picture?: string) => void;
}

export function AuthPage({ onLogin }: AuthPageProps) {
  const [error, setError] = useState('');

  const handleGoogleSuccess = (credential: string, name: string, email: string, picture: string) => {
    // Store user info in localStorage
    const userData = {
      name,
      email,
      picture,
      credential,
      loginType: 'google'
    };
    
    localStorage.setItem(`user_${email}`, JSON.stringify(userData));
    onLogin(name, email, picture);
  };

  const handleGoogleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleGuestLogin = () => {
    onLogin('guest');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Quiz - Rzeczoznawca Majątkowy
            </h1>
            <p className="text-gray-600">
              Zaloguj się przez Google, aby zapisywać postępy
            </p>
          </div>

          <div className="space-y-4">
            <GoogleSignIn 
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />

            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">lub</span>
              </div>
            </div>

            <button
              onClick={handleGuestLogin}
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <UserX className="w-5 h-5" />
              Kontynuuj bez konta
            </button>
            <p className="text-sm text-gray-500 text-center">
              Zapisane pytania nie będą przechowywane między sesjami
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
