import { useState } from 'react';
import { Trash2, ArrowLeft } from 'lucide-react';
import type { SavedQuestion } from '../App';

interface SavedQuestionsProps {
  username: string;
  onBack: () => void;
}

export function SavedQuestions({ username, onBack }: SavedQuestionsProps) {
  const [savedQuestions, setSavedQuestions] = useState<SavedQuestion[]>(() => {
    return JSON.parse(localStorage.getItem(`savedQuestions_${username}`) || '[]');
  });

  const handleDelete = (index: number) => {
    const updated = savedQuestions.filter((_, i) => i !== index);
    setSavedQuestions(updated);
    localStorage.setItem(`savedQuestions_${username}`, JSON.stringify(updated));
  };

  const handleClearAll = () => {
    if (window.confirm('Czy na pewno chcesz usunąć wszystkie zapisane pytania?')) {
      setSavedQuestions([]);
      localStorage.setItem(`savedQuestions_${username}`, JSON.stringify([]));
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Zapisane pytania</h2>
              <p className="text-gray-600">Pytania, które chcesz powtórzyć</p>
            </div>
          </div>
          {savedQuestions.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Usuń wszystkie
            </button>
          )}
        </div>
      </div>

      {savedQuestions.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <p className="text-xl text-gray-600">
            Nie masz jeszcze zapisanych pytań.
          </p>
          <p className="text-gray-500 mt-2">
            Podczas rozwiązywania quizu kliknij ikonę zakładki, aby zapisać pytanie.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {savedQuestions.map((question, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="text-sm text-indigo-600 font-semibold mb-2">
                    Data egzaminu: {question.examDate}
                  </div>
                  
                  <div className="text-lg font-semibold text-gray-800 mb-4">
                    {index + 1}. {question.text}
                  </div>

                  <div className="space-y-2">
                    {question.answers.map((answer, answerIndex) => {
                      const isCorrect = question.correctAnswers[answerIndex];
                      
                      return (
                        <div
                          key={answerIndex}
                          className={`p-4 border-2 rounded-lg ${
                            isCorrect
                              ? 'bg-green-50 border-green-500'
                              : 'border-gray-200'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={isCorrect}
                              disabled
                              className="mt-1 w-5 h-5 text-green-600 rounded cursor-not-allowed"
                            />
                            <span className="flex-1 text-gray-700">{answer}</span>
                            {isCorrect && (
                              <span className="text-green-600 font-semibold">✓ Poprawna</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-3 text-sm text-gray-500">
                    Zapisane: {new Date(question.savedAt).toLocaleDateString('pl-PL', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(index)}
                  className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Usuń pytanie"
                >
                  <Trash2 className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
