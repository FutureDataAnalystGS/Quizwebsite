import { useState, useEffect } from 'react';
import { AuthPage } from './components/AuthPage';
import { QuizSelector } from './components/QuizSelector';
import { Quiz } from './components/Quiz';
import { SavedQuestions } from './components/SavedQuestions';
import { LogOut, BookMarked } from 'lucide-react';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

export interface Question {
  examDate: string;
  text: string;
  answers: string[];
  correctAnswers: boolean[];
}

export interface SavedQuestion extends Question {
  savedAt: string;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userPicture, setUserPicture] = useState<string | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSavedQuestions, setShowSavedQuestions] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedEmail = localStorage.getItem('currentUserEmail');
    const savedPicture = localStorage.getItem('currentUserPicture');
    if (savedUser) {
      setCurrentUser(savedUser);
      setUserEmail(savedEmail);
      setUserPicture(savedPicture);
    }
  }, []);

  const handleLogin = (username: string, email?: string, picture?: string) => {
    setCurrentUser(username);
    setUserEmail(email || null);
    setUserPicture(picture || null);
    localStorage.setItem('currentUser', username);
    if (email) localStorage.setItem('currentUserEmail', email);
    if (picture) localStorage.setItem('currentUserPicture', picture);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
    setCurrentUser(null);
    setUserEmail(null);
    setUserPicture(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserEmail');
    localStorage.removeItem('currentUserPicture');
    setQuizStarted(false);
    setShowSavedQuestions(false);
  };

  const handleLoadQuiz = async (questionCount: number) => {
    setIsLoading(true);
    setError(null);
    setShowSavedQuestions(false);

    try {
      const response = await fetch('https://raw.githubusercontent.com/FutureDataAnalystGS/Quizwebsite/refs/heads/main/Baza.json');

      if (!response.ok) {
        throw new Error('Nie udało się załadować pytań');
      }

      const data: Question[] = await response.json();

      const shuffled = [...data].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, questionCount);

      setQuestions(selected);
      setQuizStarted(true);
    } catch (err) {
      setError('Błąd podczas ładowania quizu. Sprawdź połączenie internetowe.');
      console.error('Error loading quiz:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = () => {
    setQuizStarted(false);
    setQuestions([]);
    setError(null);
  };

  const handleShowSaved = () => {
    setQuizStarted(false);
    setShowSavedQuestions(true);
  };

  const handleBackToQuiz = () => {
    setShowSavedQuestions(false);
  };

  if (!currentUser) {
    return <AuthPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-indigo-600 text-white py-6 px-4 shadow-lg">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h1 className="text-2xl md:text-3xl">
              Egzamin na rzeczoznawcę majątkowego - testy z lat ubiegłych
            </h1>
            <div className="flex items-center gap-3">
              <button
                onClick={handleShowSaved}
                className="flex items-center gap-2 bg-indigo-700 hover:bg-indigo-800 px-4 py-2 rounded-lg transition-colors"
              >
                <BookMarked className="w-5 h-5" />
                <span className="hidden sm:inline">Zapisane pytania</span>
              </button>
              <div className="flex items-center gap-3 bg-indigo-700 px-4 py-2 rounded-lg">
                {userPicture && (
                  <img
                    src={userPicture}
                    alt={currentUser || 'User'}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span className="font-semibold">
                  {currentUser === 'guest' ? 'Gość' : currentUser}
                </span>
                <button
                  onClick={handleLogout}
                  className="hover:bg-indigo-800 p-1 rounded transition-colors"
                  title="Wyloguj"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {showSavedQuestions ? (
          <SavedQuestions
            username={userEmail || currentUser || 'guest'}
            onBack={handleBackToQuiz}
          />
        ) : !quizStarted ? (
          <QuizSelector
            onLoadQuiz={handleLoadQuiz}
            isLoading={isLoading}
            error={error}
          />
        ) : (
          <Quiz
            questions={questions}
            onRestart={handleRestart}
            username={userEmail || currentUser || 'guest'}
          />
        )}
      </div>
    </div>
  );
}
