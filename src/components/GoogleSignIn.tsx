import { useEffect, useRef } from 'react';

interface GoogleSignInProps {
  onSuccess: (credential: string, name: string, email: string, picture: string) => void;
  onError: (error: string) => void;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, config: any) => void;
          prompt: () => void;
        };
      };
    };
  }
}

export function GoogleSignIn({ onSuccess, onError }: GoogleSignInProps) {
  const googleButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Google Sign-In script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        // Note: Replace with your actual Google Client ID
        // Get it from: https://console.cloud.google.com/apis/credentials
        const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';

        window.google.accounts.id.initialize({
          client_id: CLIENT_ID,
          callback: handleCredentialResponse,
        });

        if (googleButtonRef.current) {
          window.google.accounts.id.renderButton(
            googleButtonRef.current,
            {
              theme: 'outline',
              size: 'large',
              width: '100%',
              text: 'continue_with',
              locale: 'pl',
            }
          );
        }
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCredentialResponse = (response: any) => {
    try {
      // Decode JWT token to get user info
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      
      onSuccess(
        response.credential,
        payload.name || payload.email,
        payload.email,
        payload.picture || ''
      );
    } catch (error) {
      onError('Błąd podczas logowania przez Google');
      console.error('Google Sign-In error:', error);
    }
  };

  return (
    <div>
      <div ref={googleButtonRef} className="w-full"></div>
      <div className="mt-4 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Uwaga dla dewelopera:</strong> Aby włączyć logowanie przez Google, musisz:
        </p>
        <ol className="text-sm text-yellow-800 mt-2 list-decimal list-inside space-y-1">
          <li>Przejdź do <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a></li>
          <li>Utwórz nowy projekt lub wybierz istniejący</li>
          <li>Utwórz "OAuth 2.0 Client ID"</li>
          <li>Skopiuj Client ID i zastąp "YOUR_GOOGLE_CLIENT_ID" w pliku /components/GoogleSignIn.tsx</li>
          <li>Dodaj domenę swojej aplikacji do "Authorized JavaScript origins"</li>
        </ol>
      </div>
    </div>
  );
}
