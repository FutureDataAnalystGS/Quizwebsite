import { useState } from 'react';
import { Slider } from './ui/slider';

interface QuizSelectorProps {
  onLoadQuiz: (count: number, years: number[]) => void;
  isLoading: boolean;
  error: string | null;
}

export function QuizSelector({ onLoadQuiz, isLoading, error }: QuizSelectorProps) {
  const [selectedCount, setSelectedCount] = useState(20);
  const [selectedYears, setSelectedYears] = useState<number[]>([]); // Empty array means "All"

  const years = Array.from({ length: 10 }, (_, i) => 2016 + i); // 2016-2025

  const handleSubmit = () => {
    onLoadQuiz(selectedCount, selectedYears);
  };

  const toggleYear = (year: number) => {
    setSelectedYears(prev => {
      if (prev.includes(year)) {
        return prev.filter(y => y !== year);
      } else {
        return [...prev, year];
      }
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="space-y-12">
        <div>
          <label htmlFor="question-count" className="block text-lg font-semibold text-gray-700 mb-3">
            Wybierz liczbę pytań: <span className="text-indigo-600 font-bold">{selectedCount}</span>
          </label>
          <Slider
            defaultValue={[selectedCount]}
            max={90}
            min={10}
            step={1}
            value={[selectedCount]}
            onValueChange={(value) => setSelectedCount(value[0])}
            disabled={isLoading}
            className="py-4"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-3">
            Wybierz lata egzaminów:
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedYears([])}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedYears.length === 0
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              Wszystkie
            </button>
            {years.map(year => (
              <button
                key={year}
                onClick={() => toggleYear(year)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedYears.includes(year)
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {year}
              </button>
            ))}
          </div>
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
