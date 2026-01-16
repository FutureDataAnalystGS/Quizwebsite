import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { LogIn } from 'lucide-react';

interface GoogleSignInProps {
  onSuccess: (credential: string, name: string, email: string, picture: string) => void;
  onError: (error: string) => void;
}

export function GoogleSignIn({ onSuccess, onError }: GoogleSignInProps) {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      onSuccess(
        await user.getIdToken(),
        user.displayName || user.email || 'Użytkownik',
        user.email || '',
        user.photoURL || ''
      );
    } catch (error: any) {
      console.error('Błąd logowania:', error);
      onError(error.message || 'Wystąpił błąd podczas logowania przez Google');
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="w-full bg-white text-gray-700 border border-gray-300 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google"
        className="w-5 h-5"
      />
      Zaloguj się przez Google
    </button>
  );
}
