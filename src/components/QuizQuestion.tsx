import { Bookmark } from 'lucide-react';
import type { Question } from '../App';

interface QuizQuestionProps {
  question: Question;
  questionNumber: number;
  selectedAnswers: Set<number>;
  onAnswerToggle: (answerIndex: number) => void;
  onSaveQuestion: () => void;
  submitted: boolean;
  isSaved: boolean;
}

export function QuizQuestion({
  question,
  questionNumber,
  selectedAnswers,
  onAnswerToggle,
  onSaveQuestion,
  submitted,
  isSaved
}: QuizQuestionProps) {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pl-PL', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="text-sm text-indigo-600 font-semibold mb-2">
            Data egzaminu: {formatDate(question.examDate)}
          </div>

          <div className="text-lg font-semibold text-gray-800">
            {questionNumber}. {question.text}
          </div>
        </div>

        <button
          onClick={onSaveQuestion}
          className={`flex-shrink-0 p-2 rounded-lg transition-colors ${isSaved
            ? 'text-green-600 bg-green-50 hover:bg-green-100'
            : 'text-indigo-600 hover:bg-indigo-50'
            }`}
          title={isSaved ? "Usuń z zapisanych" : "Zapisz pytanie do nauki"}
        >
          <Bookmark className={`w-6 h-6 ${isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="space-y-2">
        {question.answers.map((answer, answerIndex) => {
          const isSelected = selectedAnswers.has(answerIndex);
          const isCorrect = question.correctAnswers[answerIndex];

          let labelClass = 'block p-4 border-2 rounded-lg cursor-pointer transition-all ';

          if (submitted) {
            if (isCorrect) {
              labelClass += 'bg-green-50 border-green-500 ';
            } else if (isSelected && !isCorrect) {
              labelClass += 'bg-red-50 border-red-500 ';
            } else {
              labelClass += 'border-gray-200 ';
            }
          } else {
            if (isSelected) {
              labelClass += 'bg-indigo-50 border-indigo-500 ';
            } else {
              labelClass += 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50 ';
            }
          }

          return (
            <label key={answerIndex} className={labelClass}>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onAnswerToggle(answerIndex)}
                  disabled={submitted}
                  className="mt-1 w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer disabled:cursor-not-allowed"
                />
                <span className="flex-1 text-gray-700">{answer}</span>
                {submitted && isCorrect && (
                  <span className="text-green-600 font-semibold">✓</span>
                )}
                {submitted && isSelected && !isCorrect && (
                  <span className="text-red-600 font-semibold">✗</span>
                )}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
