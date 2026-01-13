import { useState } from 'react';

interface QuizSelectorProps {
  onLoadQuiz: (count: number) => void;
  isLoading: boolean;
  error: string | null;
}

export function QuizSelector({ onLoadQuiz, isLoading, error }: QuizSelectorProps) {
  const [selectedCount, setSelectedCount] = useState(20);

  const handleSubmit = () => {
    onLoadQuiz(selectedCount);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="space-y-6">
        <div>
          <label htmlFor="question-count" className="block text-lg font-semibold text-gray-700 mb-3">
            Wybierz liczbę pytań:
          </label>
          <select
            id="question-count"
            value={selectedCount}
            onChange={(e) => setSelectedCount(parseInt(e.target.value))}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-lg"
            disabled={isLoading}
          >
            <option value={20}>20</option>
            <option value={40}>40</option>
            <option value={60}>60</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Ładowanie...' : 'Załaduj quiz'}
        </button>

        {error && (
          <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
